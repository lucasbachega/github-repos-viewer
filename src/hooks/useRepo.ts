import { useState, useCallback, useEffect } from 'react';
import { fetchRepo } from '@/api/github';
import { getDisplayMessage } from '@/api/errorMessages';
import type { GitHubRepo } from '@/types/github';

export function useRepo(owner: string | undefined, repo: string | undefined) {
  const [data, setData] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!owner || !repo) {
      setData(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRepo(owner, repo);
      setData(result);
    } catch (err) {
      setError(getDisplayMessage(err, 'repo'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [owner, repo]);

  useEffect(() => {
    load();
  }, [load]);

  return { repo: data, loading, error, refetch: load };
}
