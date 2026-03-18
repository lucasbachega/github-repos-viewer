import { useNavigate } from 'react-router-dom';

const DEFAULT_USERS = ['lucasbachega', 'gaearon', 'sindresorhus'];

interface QuickTryProps {
  usernames?: string[];
}

export function QuickTry({ usernames = DEFAULT_USERS }: QuickTryProps) {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <p className="text-muted small mb-2">Experimente:</p>
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {usernames.map((username) => (
          <button
            key={username}
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(`/${username}`)}
          >
            {username}
          </button>
        ))}
      </div>
    </div>
  );
}
