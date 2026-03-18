import type { GitHubRepo } from '@/types/github';
import { formatCount } from '@/utils/format';
import { getLanguageColor } from '@/utils/languageColors';

interface RepoDetailCardProps {
  repo: GitHubRepo;
}

export function RepoDetailCard({ repo }: RepoDetailCardProps) {
  const langColor = getLanguageColor(repo.language);

  return (
    <div className="card shadow-sm border">
      <div className="card-body p-4 p-md-5">
        <h1 className="h4 fw-bold mb-2">{repo.full_name}</h1>
        {repo.description && (
          <p className="text-muted small lh-base mb-3">{repo.description}</p>
        )}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-light text-dark d-inline-flex align-items-center gap-1 tabular-nums">
            <i className="bi bi-star-fill text-warning" aria-hidden />
            {formatCount(repo.stargazers_count)} estrelas
          </span>
          <span className="badge bg-light text-dark d-inline-flex align-items-center gap-1 tabular-nums">
            <i className="bi bi-git" aria-hidden />
            {formatCount(repo.forks_count)} forks
          </span>
          {repo.language && (
            <span className="badge bg-light text-dark d-inline-flex align-items-center gap-1">
              <span
                className="rounded-circle d-inline-block"
                style={{ width: 8, height: 8, backgroundColor: langColor }}
                aria-hidden
              />
              {repo.language}
            </span>
          )}
        </div>
        {repo.topics && repo.topics.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mb-3">
            {repo.topics.map((topic) => (
              <span key={topic} className="badge bg-primary bg-opacity-10 text-primary">
                {topic}
              </span>
            ))}
          </div>
        )}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <i className="bi bi-box-arrow-up-right me-1" aria-hidden />
          Ver no GitHub
        </a>
      </div>
    </div>
  );
}
