import { useEffect, useState } from "react";
import { fetchUser } from "@/api/github";
import type { GitHubUser } from "@/types/github";
import { DeveloperCard } from "./components/DeveloperCard";
import { SearchBar } from "@/components/SearchBar";
import { QuickTry } from "./components/QuickTry";

const DEV_USERNAME = "lucasbachega";

export function HomePage() {
  const [devUser, setDevUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    fetchUser(DEV_USERNAME)
      .then(setDevUser)
      .catch(() => setDevUser(null));
  }, []);

  return (
    <div className="pb-5 d-flex flex-column align-items-center justify-content-center gap-4">
      <div className="d-flex flex-column align-items-center justify-content-center pt-5 px-3">
        <div className="text-center w-100" style={{ maxWidth: "32rem" }}>
          <div
            className="rounded-3 bg-white shadow-sm border d-inline-flex align-items-center justify-content-center mb-4"
            style={{ width: 64, height: 64 }}
          >
            <i className="bi bi-github fs-2 text-dark" />
          </div>
          <h1 className="fs-2 fs-md-1 fw-bold text-dark mb-2">
            Explore o ecossistema de código
          </h1>
          <p className="text-muted small mb-4 lh-base mx-5">
            Descubra repositórios, explore perfis e mergulhe nos detalhes de
            projetos open source no GitHub.
          </p>

          <SearchBar
            placeholder="Digite um nome de usuário..."
            size="md"
            variant="hero"
            autoFocus
          />
        </div>
      </div>
      <QuickTry />
      {devUser && <DeveloperCard user={devUser} />}
    </div>
  );
}
