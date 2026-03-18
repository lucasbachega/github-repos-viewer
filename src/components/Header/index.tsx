import { Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";

export function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top">
      <div className="container position-relative">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 z-1 position-relative"
          aria-label="GitHub Explorer - Início"
        >
          <i className="bi bi-github fs-4" />
          <span className="fw-semibold d-none d-lg-inline">
            GitHub Explorer
          </span>
        </Link>
        <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center pe-none ps-5 pe-3 ps-md-0 pe-md-0">
          <div
            className="pe-auto min-w-0 flex-grow-1"
            style={{ maxWidth: "28rem" }}
          >
            <SearchBar size="sm" placeholder="Buscar usuário do GitHub..." />
          </div>
        </div>
      </div>
    </header>
  );
}
