import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/Home';
import { UserProfilePage } from '@/pages/UserProfile';
import { RepoDetailPage } from '@/pages/RepoDetail';
import { NotFoundPage } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ':username', element: <UserProfilePage /> },
      { path: ':username/:reponame', element: <RepoDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
