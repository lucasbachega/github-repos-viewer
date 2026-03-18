import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { GitHubRepo } from '@/types/github';
import { formatCount, formatDate } from '@/utils/format';
import { getLanguageColor } from '@/utils/languageColors';

interface RepoCardProps {
  repo: GitHubRepo;
  username: string;
}

function RepoCardComponent({ repo, username }: RepoCardProps) {
  const color = getLanguageColor(repo.language);

  return (
    <li className="list-group-item list-group-item-action p-3 border-start-0 border-end-0">
      <Link to={`/${username}/${repo.name}`} className="repo-card-link d-block text-body">
        <div className="d-flex flex-column flex-sm-row flex-sm-wrap justify-content-sm-between gap-2">
          <div className="min-w-0 flex-grow-1">
            <h3 className="h6 fw-semibold mb-1 text-primary repo-card-link">
              {repo.name}
            </h3>
            {repo.description && (
              <p className="small text-muted mb-0 line-clamp lh-base">
                {repo.description}
              </p>
            )}
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3 small text-muted">
            {repo.language && (
              <span className="d-inline-flex align-items-center gap-1">
                <span
                  className="rounded-circle d-inline-block"
                  style={{ width: 8, height: 8, backgroundColor: color }}
                  aria-hidden
                />
                {repo.language}
              </span>
            )}
            <span className="d-inline-flex align-items-center gap-1 text-warning">
              <i className="bi bi-star-fill" aria-hidden />
              <span className="tabular-nums">{formatCount(repo.stargazers_count)}</span>
            </span>
            <span className="d-inline-flex align-items-center gap-1">
              <i className="bi bi-git" aria-hidden />
              <span className="tabular-nums">{formatCount(repo.forks_count)}</span>
            </span>
            <span className="tabular-nums ms-sm-auto">Atualizado em {formatDate(repo.updated_at)}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export const RepoCard = memo(RepoCardComponent);
