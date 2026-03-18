import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRepo } from '@/hooks/useRepo';
import { ErrorMessage } from '@/components/ErrorMessage';
import { RepoDetailCard } from './components/RepoDetailCard';
import { SkeletonDetail } from './components/SkeletonDetail';

export function RepoDetailPage() {
  const { username, reponame } = useParams<{ username: string; reponame: string }>();
  const navigate = useNavigate();
  const { repo, loading, error } = useRepo(username, reponame);

  if (!username || !reponame) {
    navigate('/', { replace: true });
    return null;
  }

  if (error) {
    return (
      <div className="container py-5">
        <ErrorMessage message={error} />
        <Link to="/" className="btn btn-outline-secondary mt-3">
          Voltar à busca
        </Link>
      </div>
    );
  }

  if (loading || !repo) {
    return (
      <div className="container py-5">
        <div className="placeholder-glow mb-3">
          <span className="placeholder col-3" />
        </div>
        <SkeletonDetail />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link
        to={`/${username}`}
        className="text-muted text-decoration-none small d-inline-block mb-3"
      >
        ← {username}
      </Link>
      <div className="mx-auto" style={{ maxWidth: '42rem' }}>
        <RepoDetailCard repo={repo} />
      </div>
    </div>
  );
}
