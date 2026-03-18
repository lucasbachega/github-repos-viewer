import { memo, useState, useMemo, useCallback, useEffect } from "react";
import type { GitHubUser, GitHubRepo } from "@/types/github";
import type { RepoSortField, SortOrder } from "@/types/github";
import { RepoCard } from "../RepoCard";
import { RepoSortOptions } from "./RepoSortOptions";
import { Pagination } from "@/components/Pagination";

const PAGE_SIZE = 10;

interface RepoListProps {
  user: GitHubUser;
  repos: GitHubRepo[];
  sortField: RepoSortField;
  sortOrder: SortOrder;
  onSortChange: (field: RepoSortField, order: SortOrder) => void;
}

function RepoListComponent({
  user,
  repos,
  sortField,
  sortOrder,
  onSortChange,
}: RepoListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(repos.length / PAGE_SIZE)),
    [repos.length],
  );

  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return repos.slice(start, start + PAGE_SIZE);
  }, [repos, currentPage]);

  const rangeStart = repos.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, repos.length);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortField, sortOrder]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages],
  );

  return (
    <>
      <div className="d-flex flex-column flex-sm-row flex-sm-wrap align-items-sm-center justify-content-sm-between gap-2 mb-3">
        <h2 className="h5 fw-bold mb-0 d-flex align-items-center gap-2">
          Repositórios
          <span className="badge bg-light text-dark fw-normal tabular-nums">
            {repos.length}
          </span>
        </h2>
        <RepoSortOptions
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      </div>

      <ul className="list-group list-group-flush">
        {repos.length === 0 ? (
          <li className="list-group-item text-muted text-center py-5">
            Nenhum repositório público encontrado.
          </li>
        ) : (
          paginatedRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} username={user.login} />
          ))
        )}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={repos.length}
        pageSize={PAGE_SIZE}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
      />
    </>
  );
}

export const RepoList = memo(RepoListComponent);
