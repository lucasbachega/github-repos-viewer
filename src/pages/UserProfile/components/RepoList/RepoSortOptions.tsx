import { memo, useCallback } from 'react';
import type { RepoSortField, SortOrder } from '@/types/github';

const SORT_OPTIONS: { value: RepoSortField; label: string }[] = [
  { value: 'stargazers_count', label: 'Estrelas' },
  { value: 'name', label: 'Nome' },
  { value: 'updated_at', label: 'Atualização' },
];

interface RepoSortOptionsProps {
  sortField: RepoSortField;
  sortOrder: SortOrder;
  onSortChange: (field: RepoSortField, order: SortOrder) => void;
}

function RepoSortOptionsComponent({
  sortField,
  sortOrder,
  onSortChange,
}: RepoSortOptionsProps) {
  const handleClick = useCallback(
    (field: RepoSortField) => {
      const newOrder: SortOrder =
        sortField === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'desc';
      onSortChange(field, newOrder);
    },
    [sortField, sortOrder, onSortChange],
  );

  return (
    <div className="d-flex flex-wrap gap-1">
      {SORT_OPTIONS.map(({ value, label }) => {
        const isActive = sortField === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
            aria-pressed={isActive}
            aria-label={`Ordenar por ${label}, ${isActive ? (sortOrder === 'asc' ? 'crescente' : 'decrescente') : 'clique para ordenar'}`}
          >
            {label}
            {isActive && (
              <i
                className={`bi bi-chevron-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export const RepoSortOptions = memo(RepoSortOptionsComponent);
