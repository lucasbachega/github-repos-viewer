import { useState } from 'react';
import type { GitHubUser } from '@/types/github';
import { formatCount } from '@/utils/format';
import { getInitials } from '@/utils/user';

interface UserSidebarProps {
  user: GitHubUser;
}

export function UserSidebar({ user }: UserSidebarProps) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const initials = getInitials(user.name, user.login);
  const showImg = user.avatar_url && !avatarFailed;

  return (
    <aside className="mb-4 mb-lg-0">
      <div className="text-center text-lg-start">
        <div className="position-relative d-inline-block">
          <div className="rounded-circle overflow-hidden bg-primary d-flex align-items-center justify-content-center text-white fw-semibold fs-4" style={{ width: 112, height: 112 }}>
            {showImg ? (
              <img
                src={user.avatar_url!}
                alt={`Avatar de ${user.login}`}
                className="w-100 h-100 object-fit-cover"
                loading="lazy"
                onError={() => setAvatarFailed(true)}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
        </div>
        <h1 className="h5 fw-bold mt-3 mb-1">{user.name ?? user.login}</h1>
        <p className="text-muted small mb-2">@{user.login}</p>
      </div>

      <div className="small text-muted d-flex align-items-center gap-1 mb-2">
        <i className="bi bi-people" />
        <span className="tabular-nums">
          {formatCount(user.followers)} seguidores · {formatCount(user.following)} seguindo
        </span>
      </div>

      {user.bio && <p className="small lh-base mb-2">{user.bio}</p>}

      <div className="small text-muted">
        {user.company && (
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="bi bi-building" />
            <span>{user.company}</span>
          </div>
        )}
        {user.location && (
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="bi bi-geo-alt" />
            <span>{user.location}</span>
          </div>
        )}
        {user.email && (
          <a href={`mailto:${user.email}`} className="d-flex align-items-center gap-2 text-muted text-decoration-none mb-1 hover-primary">
            <i className="bi bi-envelope" />
            <span className="text-truncate">{user.email}</span>
          </a>
        )}
        {user.blog && (
          <a
            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center gap-2 text-muted text-decoration-none text-truncate"
          >
            <i className="bi bi-link-45deg" />
            <span className="text-truncate">{user.blog}</span>
          </a>
        )}
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="small fw-medium text-primary text-decoration-none mt-2 d-inline-block"
      >
        Ver perfil no GitHub <i className="bi bi-arrow-right" />
      </a>
    </aside>
  );
}
