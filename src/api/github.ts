import { githubClient } from "@/api/client";
import { VALIDATION } from "@/api/errorMessages";
import type { GitHubUser, GitHubRepo } from "@/types/github";

export async function fetchUser(username: string): Promise<GitHubUser> {
  const sanitized = username.trim().replace(/\s+/g, "");
  if (!sanitized) {
    throw new Error(VALIDATION.USER_REQUIRED);
  }
  const { data } = await githubClient.get<GitHubUser>(
    `/users/${encodeURIComponent(sanitized)}`,
  );
  return data;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const sanitized = username.trim().replace(/\s+/g, "");
  if (!sanitized) {
    throw new Error(VALIDATION.USER_REQUIRED);
  }
  const { data } = await githubClient.get<GitHubRepo[]>(
    `/users/${encodeURIComponent(sanitized)}/repos`,
    { params: { per_page: 100, sort: "updated" } },
  );
  return data;
}

export async function fetchRepo(
  owner: string,
  repo: string,
): Promise<GitHubRepo> {
  const safeOwner = owner.trim().replace(/\s+/g, "");
  const safeRepo = repo.trim().replace(/\s+/g, "");
  if (!safeOwner || !safeRepo) {
    throw new Error(VALIDATION.USER_OR_REPO_REQUIRED);
  }
  const { data } = await githubClient.get<GitHubRepo>(
    `/repos/${encodeURIComponent(safeOwner)}/${encodeURIComponent(safeRepo)}`,
  );
  return data;
}
