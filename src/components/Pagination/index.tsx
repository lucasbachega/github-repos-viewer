import { memo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
  rangeStart: number;
  rangeEnd: number;
}

function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  rangeStart,
  rangeEnd,
}: PaginationProps) {
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  return (
    <nav
      className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3 pt-3 border-top"
      aria-label="Paginação da lista de repositórios"
    >
      <p className="small text-muted mb-0">
        Exibindo {rangeStart}–{rangeEnd} de {totalItems}
      </p>
      <div className="d-flex gap-1">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Página anterior"
        >
          <i className="bi bi-chevron-left" aria-hidden />
        </button>
        <span className="btn btn-sm btn-outline-secondary disabled">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Próxima página"
        >
          <i className="bi bi-chevron-right" aria-hidden />
        </button>
      </div>
    </nav>
  );
}

export const Pagination = memo(PaginationComponent);
