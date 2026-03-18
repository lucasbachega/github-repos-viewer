import { useState, useCallback } from 'react';
import { fetchUser, fetchUserRepos } from '@/api/github';
import { VALIDATION, getDisplayMessage } from '@/api/errorMessages';
import type { GitHubUser, GitHubRepo } from '@/types/github';
import type { RepoSortField, SortOrder } from '@/types/github';

interface UseGitHubUserState {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

const sortRepos = (
  repos: GitHubRepo[],
  field: RepoSortField,
  order: SortOrder
): GitHubRepo[] => {
  const sorted = [...repos].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    const aNum = Number(aVal) ?? 0;
    const bNum = Number(bVal) ?? 0;
    return order === 'asc' ? aNum - bNum : bNum - aNum;
  });
  return sorted;
};

export function useGitHubUser() {
  const [state, setState] = useState<UseGitHubUserState>({
    user: null,
    repos: [],
    loading: false,
    error: null,
  });

  const [sortField, setSortField] = useState<RepoSortField>('stargazers_count');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const searchUser = useCallback(async (username: string) => {
    if (!username?.trim()) {
      setState((s) => ({ ...s, error: VALIDATION.USER_EMPTY_SEARCH, user: null, repos: [] }));
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null, user: null, repos: [] }));
    try {
      const [userData, reposData] = await Promise.all([
        fetchUser(username),
        fetchUserRepos(username),
      ]);
      const defaultSorted = sortRepos(reposData, 'stargazers_count', 'desc');
      setState({
        user: userData,
        repos: defaultSorted,
        loading: false,
        error: null,
      });
      setSortField('stargazers_count');
      setSortOrder('desc');
    } catch (err) {
      setState({
        user: null,
        repos: [],
        loading: false,
        error: getDisplayMessage(err, 'user'),
      });
    }
  }, []);

  const setReposOrder = useCallback(
    (field: RepoSortField, order: SortOrder) => {
      setSortField(field);
      setSortOrder(order);
      setState((s) => ({
        ...s,
        repos: sortRepos(s.repos, field, order),
      }));
    },
    []
  );

  const sortedRepos = state.repos;

  return {
    user: state.user,
    repos: sortedRepos,
    loading: state.loading,
    error: state.error,
    sortField,
    sortOrder,
    searchUser,
    setReposOrder,
  };
}
