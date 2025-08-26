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
}
from "@shared/ui";

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
          // .filter((r: any) => r.head_branch === "main")=
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
    // compact numbered pagination: 1 … (page-1) page (page+1) … last
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

  if (error) return <div>Error: {error}</div>;
  if (loading && runs.length === 0) return <div>Loading…</div>;

  return (
    <div className="space-y-6">
      <div>
        {runs.length === 0 ? (
          <div>No runs on main for this page.</div>
        ) : (
          runs.map((r) => (
            <div key={r.id} className="mb-6">
              {r.head_branch}
              <br />
              {r.display_title}
              <br />
              {r.head_sha}
              <br />
              #{r.run_number}
              <br />
              {r.status}
              <br />
              {r.conclusion}
              <br />
              <a href={r.html_url}>{r.html_url}</a>
              <br />
              {r.created_at}
              <br />
              {r.updated_at}
              <br /><br /><br />
            </div>
          ))
        )}
      </div>

      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => p - 1)} />
            </PaginationItem>
          )}

          {pageItems.map((it, idx) =>
            typeof it === "number" ? (
              <PaginationItem key={`${it}-${idx}`}>
                <PaginationLink
                  isActive={it === page}
                  onClick={() => setPage(it)}
                >
                  {it}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={it + "-" + idx}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => p + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
