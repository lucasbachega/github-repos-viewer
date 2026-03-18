import { memo } from "react";
import { Link } from "react-router-dom";
import type { GitHubRepo } from "@/types/github";
import { formatCount, formatDate } from "@/utils/format";
import { getLanguageColor } from "@/utils/languageColors";

interface RepoCardProps {
  repo: GitHubRepo;
  username: string;
}

function RepoCardComponent({ repo, username }: RepoCardProps) {
  const langColor = getLanguageColor(repo.language);

  return (
    <li className="list-unstyled mb-3">
      <Link
        to={`/${username}/${repo.name}`}
        className="repo-card repo-card-link d-block rounded-3 border p-3 text-start"
      >
        <div className="d-flex flex-column gap-2">
          <h3 className="h6 fw-bold mb-0 text-primary lh-base">{repo.name}</h3>
          {repo.description && (
            <p
              className="small text-secondary mb-0 lh-base line-clamp"
              style={{ "--line-clamp": 2 } as React.CSSProperties}
            >
              {repo.description}
            </p>
          )}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 small text-secondary mt-1">
            <div className="d-flex flex-wrap align-items-center gap-3">
              {repo.language && (
                <span className="d-inline-flex align-items-center gap-1">
                  <span
                    className="rounded-circle d-inline-block bg-secondary"
                    style={{ width: 8, height: 8, backgroundColor: langColor }}
                    aria-hidden
                  />
                  {repo.language}
                </span>
              )}
              <span className="d-inline-flex align-items-center gap-1 text-warning">
                <i className="bi bi-star-fill" aria-hidden />
                <span className="tabular-nums text-secondary">
                  {formatCount(repo.stargazers_count)}
                </span>
              </span>
              <span className="d-inline-flex align-items-center gap-1">
                <i className="bi bi-diagram-3 text-secondary" aria-hidden />
                <span className="tabular-nums">
                  {formatCount(repo.forks_count)}
                </span>
              </span>
            </div>
            <span className="tabular-nums">
              Atualizado em {formatDate(repo.updated_at)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export const RepoCard = memo(RepoCardComponent);
