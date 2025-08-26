"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@shared/ui";

type Run = {
  id: number;
  head_branch: string;
  display_title: string;
  run_number: number;
  status: string | null;
  conclusion: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  head_sha: string;
};

const PER_PAGE = 20;

const statusColor = (status: string | null) => {
  switch (status) {
    case "queued":
      return "bg-yellow-100 text-yellow-800 ring-yellow-200";
    case "in_progress":
      return "bg-blue-100 text-blue-800 ring-blue-200";
    case "completed":
      return "bg-slate-100 text-slate-800 ring-slate-200";
    default:
      return "bg-slate-100 text-slate-800 ring-slate-200";
  }
};

const conclusionColor = (c: string | null) => {
  switch (c) {
    case "success":
      return "bg-green-100 text-green-800 ring-green-200";
    case "failure":
      return "bg-red-100 text-red-800 ring-red-200";
    case "cancelled":
      return "bg-gray-100 text-gray-800 ring-gray-200";
    default:
      return "bg-gray-100 text-gray-800 ring-gray-200";
  }
};

const fmt = (d: string) =>
  new Date(d).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });


export default function Rollback() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  useEffect(() => {
    const fetchRuns = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.github.com/repos/Distractive/polkadotcom/actions/workflows/deploy.yml/runs?per_page=${PER_PAGE}&page=${page}&branch=main`;

        const res = await fetch(url, {
          headers: { Accept: "application/vnd.github+json" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const data = await res.json();
        setTotalCount(Number(data?.total_count ?? 0));

        const mainRuns: Run[] = (data?.workflow_runs ?? [])
          .sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .map((r: any) => ({
            id: r.id,
            head_branch: r.head_branch,
            display_title: r.display_title,
            run_number: r.run_number,
            status: r.status,
            conclusion: r.conclusion,
            html_url: r.html_url,
            created_at: r.created_at,
            updated_at: r.updated_at,
            head_sha: r.head_sha,
          }));

        setRuns(mainRuns);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, [page]);

  const pageItems = useMemo(() => {
    const items: (number | "ellipsis-left" | "ellipsis-right")[] = [];
    const add = (x: number | "ellipsis-left" | "ellipsis-right") => items.push(x);

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) add(i);
      return items;
    }

    add(1);
    if (page > 3) add("ellipsis-left");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) add(i);

    if (page < totalPages - 2) add("ellipsis-right");
    add(totalPages);

    return items;
  }, [page, totalPages]);

  if (error)
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        Error: {error}
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold">Deploy workflow runs</h2>
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages} · {totalCount} total
          </p>
        </div>
        {loading && (
          <div className="text-sm text-muted-foreground animate-pulse">
            Loading…
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border shadow-sm">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3">Run #</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Commit</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Conclusion</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody className="bg-background">
  {runs.length === 0 ? (
    <tr>
      <td
        colSpan={9}
        className="px-4 py-10 text-center text-sm text-muted-foreground border-b border-white"
      >
        No runs on main for this page.
      </td>
    </tr>
  ) : (
    runs.map((r) => (
      <tr
        key={r.id}
        className="hover:bg-muted/30 border-b border-white"
      >
        <td className="px-4 py-3 text-sm font-medium">#{r.run_number}</td>
        <td className="px-4 py-3 text-sm">{r.display_title}</td>
        <td className="px-4 py-3 text-sm">
          <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-xs ring-1 ring-slate-200">
            {r.head_branch}
          </span>
        </td>
        <td className="px-4 py-3">
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            {r.head_sha}
          </code>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ring-1 ${statusColor(
              r.status
            )}`}
          >
            {r.status ?? "—"}
          </span>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ring-1 ${conclusionColor(
              r.conclusion
            )}`}
          >
            {r.conclusion ?? "—"}
          </span>
        </td>
        <td className="px-4 py-3 text-sm">{fmt(r.created_at)}</td>
        <td className="px-4 py-3 text-sm">{fmt(r.updated_at)}</td>
        <td className="px-4 py-3">
          <a
            href={r.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted"
          >
            View
          </a>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>

      {totalPages > 1 && (
  <Pagination className="mx-auto mt-6">
    <PaginationContent className="flex items-center gap-1">
      <PaginationItem>
        <PaginationPrevious
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className={`rounded-md border px-3 py-2 text-sm transition ${
            page === 1
              ? "pointer-events-none opacity-40"
              : "hover:bg-muted"
          }`}
        />
      </PaginationItem>

      {pageItems.map((it, idx) =>
        typeof it === "number" ? (
          <PaginationItem key={`${it}-${idx}`}>
            <PaginationLink
              isActive={it === page}
              onClick={() => setPage(it)}
              className={`rounded-md px-3 py-2 text-sm transition ${
                it === page
                  ? "bg-primary text-primary-foreground"
                  : "border hover:bg-muted"
              }`}
            >
              {it}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={it + "-" + idx}>
            <PaginationEllipsis className="px-3 py-2 text-sm" />
          </PaginationItem>
        )
      )}

      <PaginationItem>
        <PaginationNext
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className={`rounded-md border px-3 py-2 text-sm transition ${
            page === totalPages
              ? "pointer-events-none opacity-40"
              : "hover:bg-muted"
          }`}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>

      )}
    </div>
  );
}
