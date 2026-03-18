import { NOT_FOUND } from '@/api/errorMessages';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  is404?: boolean;
}

export function ErrorMessage({ message, onRetry, is404 }: ErrorMessageProps) {
  return (
    <div className="card shadow-sm border" role="alert">
      <div className="card-body text-center py-5">
        <i className="bi bi-exclamation-circle text-danger fs-1 mb-3 d-block" aria-hidden />
        <h2 className="h5 fw-bold mb-2">Ops!</h2>
        <p className="text-muted small mb-0 mx-auto" style={{ maxWidth: '28rem' }}>
          {is404 ? NOT_FOUND.USER_HINT : message}
        </p>
        {onRetry && (
          <button type="button" className="btn btn-primary mt-3" onClick={onRetry}>
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}
