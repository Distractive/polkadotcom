'use client';

import {
  Icon,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@shared/ui';
import { cn } from '@shared/ui/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import '@shared/ui/styles/global.css';

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

const shortSha = (sha: string) => sha?.slice(0, 7);

const statusColor = (status: string | null) => {
  switch (status) {
    case 'queued':
      return 'bg-yellow-100 text-yellow-800 ring-yellow-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 ring-blue-200';
    case 'completed':
      return 'bg-slate-100 text-slate-800 ring-slate-200';
    default:
      return 'bg-slate-100 text-slate-800 ring-slate-200';
  }
};

const conclusionColor = (c: string | null) => {
  switch (c) {
    case 'success':
      return 'bg-green-100 text-green-800 ring-green-200';
    case 'failure':
      return 'bg-red-100 text-red-800 ring-red-200';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 ring-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 ring-gray-200';
  }
};

const fmt = (d: string) =>
  new Date(d).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function Rollback() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Pick<
    Run,
    'run_number' | 'head_sha'
  > | null>(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  useEffect(() => {
    const fetchRuns = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.github.com/repos/Distractive/polkadotcom/actions/workflows/deploy.yml/runs?per_page=${PER_PAGE}&page=${page}&branch=main`;

        const res = await fetch(url, {
          headers: { Accept: 'application/vnd.github+json' },
          cache: 'no-store',
        });

        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const data = await res.json();
        setTotalCount(Number(data?.total_count ?? 0));

        const mainRuns: Run[] = (data?.workflow_runs ?? [])
          .sort(
            (a: Run, b: Run) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .map((r: Run) => ({
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
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRuns();
  }, [page]);

  const pageItems = useMemo(() => {
    const items: (number | 'ellipsis-left' | 'ellipsis-right')[] = [];
    const add = (x: number | 'ellipsis-left' | 'ellipsis-right') =>
      items.push(x);

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) add(i);
      return items;
    }

    add(1);
    if (page > 3) add('ellipsis-left');

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) add(i);

    if (page < totalPages - 2) add('ellipsis-right');
    add(totalPages);

    return items;
  }, [page, totalPages]);

  const openModal = useCallback((r: Run) => {
    setSelected({ run_number: r.run_number, head_sha: r.head_sha });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelected(null);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen, closeModal]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
  };

  if (error)
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700 antialiased m-auto w-full max-w-[1600px]">
        Error: {error}
      </div>
    );

  return (
    <div className={cn('antialiased m-auto w-full max-w-[1600px]')}>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-semibold text-white my-8 text-xl">
              workflow runs
            </h2>
            <p className="text-md text-muted-foreground">
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
                <th className="px-4 py-3 whitespace-nowrap">Run #</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3">Commit</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Conclusion</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3" />
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="bg-background">
              {runs.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-10 text-center text-sm text-muted-foreground border-b"
                  >
                    No runs on main for this page.
                  </td>
                </tr>
              ) : (
                runs.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => openModal(r)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') openModal(r);
                    }}
                    tabIndex={0}
                    role="button"
                    className="cursor-pointer hover:bg-muted/40 transition-colors border-b"
                  >
                    <td className="px-4 py-3 text-xs font-medium">
                      #{r.run_number}
                    </td>
                    <td className="px-4 py-3 text-xs">{r.display_title}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-xs ring-1 ring-slate-200">
                        {r.head_branch}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        {shortSha(r.head_sha)}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ring-1 ${statusColor(
                          r.status,
                        )}`}
                      >
                        {r.status ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ring-1 ${conclusionColor(
                          r.conclusion,
                        )}`}
                      >
                        {r.conclusion ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">{fmt(r.created_at)}</td>
                    <td className="px-4 py-3 text-xs">{fmt(r.updated_at)}</td>
                    <td className="px-4 py-3">
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </a>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(r);
                        }}
                        className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                        aria-label={`Show hash and run number for #${r.run_number}`}
                      >
                        Rollback
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="my-8">
            <Pagination className="mx-auto my-8">
              <PaginationContent className="flex items-center gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={cn(
                      'rounded-md border px-3 py-2 text-xs transition text-white',
                      page === 1
                        ? 'pointer-events-none opacity-40'
                        : 'hover:bg-muted',
                    )}
                  />
                </PaginationItem>

                {pageItems.map((it, idx) =>
                  typeof it === 'number' ? (
                    <PaginationItem key={`page-${it}`}>
                      <PaginationLink
                        isActive={it === page}
                        onClick={() => setPage(it)}
                        className={cn(
                          'rounded-md px-3 py-2 text-xs transition text-white',
                          it === page
                            ? 'bg-primary text-primary-foreground'
                            : 'border hover:bg-muted',
                        )}
                      >
                        {it}
                      </PaginationLink>
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={it}>
                      <PaginationEllipsis className="px-3 py-2 text-xs" />
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={cn(
                      'rounded-md border px-3 py-2 text-xs transition text-white',
                      page === totalPages
                        ? 'pointer-events-none opacity-40'
                        : 'hover:bg-muted',
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {isModalOpen && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') closeModal();
            }}
            tabIndex={0}
            role="button"
            aria-label="Close modal background"
          />
          <div className="relative z-10 w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">
                Workflow Run Details
              </h2>
              <button type="button" onClick={closeModal} aria-label="Close">
                <Icon
                  variant="close"
                  className={cn('size-6 shrink-0 fill-current fill-white')}
                />
              </button>
            </div>

            <p className="pb-10 text-base font-semibold text-white">
              Copy the values below and enter them in the corresponding fields
              in the 'Run Workflow' dialog.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Run number
                  </div>
                  <div className="font-mono text-xs">
                    #{selected.run_number}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copy(String(selected.run_number))}
                  className="rounded-md border px-2.5 py-1 text-xs hover:bg-muted"
                >
                  Copy
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">
                    Commit hash
                  </div>
                  <div className="font-mono text-xs truncate">
                    {selected.head_sha}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copy(selected.head_sha)}
                  className="rounded-md border px-2.5 py-1 text-xs hover:bg-muted"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                className="justify-end border p-2 rounded-md"
                href="https://github.com/Distractive/polkadotcom/actions/workflows/rollback.yml"
                target="_blank"
                rel="noreferrer"
              >
                Go to Action
                <Icon variant="arrowRight" className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
