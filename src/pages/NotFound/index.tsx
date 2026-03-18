import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-vh-75 d-flex align-items-center justify-content-center px-3">
      <div className="card shadow-sm border text-center" style={{ maxWidth: '24rem' }}>
        <div className="card-body py-5">
          <i className="bi bi-exclamation-circle text-danger fs-1 mb-3 d-block" aria-hidden />
          <h1 className="h5 fw-bold mb-2">Página não encontrada</h1>
          <p className="text-muted small mb-4">
            A URL que você acessou não existe. Volte ao início para buscar um usuário.
          </p>
          <Link to="/" className="btn btn-primary">
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
