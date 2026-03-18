export const VALIDATION = {
  USER_REQUIRED: "Nome de usuário é obrigatório.",
  USER_OR_REPO_REQUIRED: "Usuário e nome do repositório são obrigatórios.",
  USER_EMPTY_SEARCH: "Digite um nome de usuário.",
} as const;

export const NOT_FOUND = {
  USER: "Usuário não encontrado.",
  USER_HINT: "Usuário não encontrado. Verifique o nome e tente novamente.",
  REPO: "Repositório não encontrado.",
} as const;

export const API = {
  RATE_LIMIT: "Limite de requisições da API atingido. Tente mais tarde.",
  GENERIC: "Erro ao comunicar com a API.",
  FETCH_USER: "Erro ao buscar usuário.",
  FETCH_REPO: "Erro ao carregar repositório.",
} as const;

export type ErrorContext = "user" | "repo";

export interface ApiLikeError {
  message?: string;
  status?: number;
}

export function getDisplayMessage(
  error: unknown,
  context?: ErrorContext,
): string {
  const err = error as ApiLikeError | undefined;
  const message = err?.message;
  const status = err?.status;

  if (status === 404) {
    return context === "user"
      ? NOT_FOUND.USER
      : context === "repo"
        ? NOT_FOUND.REPO
        : message || API.GENERIC;
  }
  if (status === 403) {
    return API.RATE_LIMIT;
  }

  return typeof message === "string" && message.length > 0
    ? message
    : API.GENERIC;
}
