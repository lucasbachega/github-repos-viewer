import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGitHubUser } from '@/hooks/useGitHubUser';
import { ErrorMessage } from '@/components/ErrorMessage';
import { UserSidebar } from './components/UserSidebar';
import { RepoList } from './components/RepoList';
import { SkeletonUserSidebar, SkeletonRepoCards } from './components/Skeletons';

export function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const {
    user,
    repos,
    loading,
    error,
    sortField,
    sortOrder,
    searchUser,
    setReposOrder,
  } = useGitHubUser();

  useEffect(() => {
    if (username) searchUser(username);
  }, [username, searchUser]);

  if (!username) {
    navigate('/', { replace: true });
    return null;
  }

  if (error && !loading) {
    return (
      <div className="container py-5">
        <ErrorMessage
          message={error}
          onRetry={() => searchUser(username)}
          is404={error.includes('não encontrado')}
        />
      </div>
    );
  }

  if (loading && !user) {
    return (
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <SkeletonUserSidebar />
          </div>
          <div className="col-lg-8 col-xl-9">
            <SkeletonRepoCards />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
          <div className="sticky-lg-top" style={{ top: '5.5rem' }}>
            <UserSidebar user={user} />
          </div>
        </div>
        <div className="col-lg-8 col-xl-9">
          <RepoList
            user={user}
            repos={repos}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={setReposOrder}
          />
        </div>
      </div>
    </div>
  );
}
