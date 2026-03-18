import { Link } from "react-router-dom";
import type { GitHubUser } from "@/types/github";
import { formatCount } from "@/utils/format";

interface DeveloperCardProps {
  user: GitHubUser;
}

export function DeveloperCard({ user }: DeveloperCardProps) {
  const profileUrl = `/${encodeURIComponent(user.login)}`;

  return (
    <div className="container py-2 d-flex flex-column align-items-center justify-content-center">
      <p className="text-uppercase text-muted small fw-semibold mb-3">
        Desenvolvido por
      </p>
      <Link
        to={profileUrl}
        className="card developer-card shadow-sm w-100-lg-50 text-decoration-none text-body"
      >
        <div className="card-body d-flex align-items-start justify-content-between">
          <div className="row align-items-start">
            <div className="col-auto">
              <img
                src={user.avatar_url}
                alt={`Avatar de ${user.login}`}
                className="rounded-circle"
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <div className="col">
              <h2 className="h6 fw-bold mb-1">{user.name ?? user.login}</h2>
              <p className="text-muted small">@{user.login}</p>
              {user.bio && (
                <p
                  className="small text-body lh-base line-clamp"
                  style={{ "--line-clamp": 2 } as React.CSSProperties}
                >
                  {user.bio}
                </p>
              )}
              <div className="d-flex flex-wrap gap-3 small text-muted">
                {user.location && (
                  <span>
                    <i className="bi bi-geo-alt me-1" />
                    {user.location}
                  </span>
                )}
                <span>
                  <i className="bi bi-folder me-1" />
                  {formatCount(user.public_repos)} repos
                </span>
                <span>
                  <i className="bi bi-people me-1" />
                  {formatCount(user.followers)} seguidores
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="btn btn-sm btn-outline-primary text-nowrap">
              Ver perfil
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
