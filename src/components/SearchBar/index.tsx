import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyShortcut } from '@/hooks/useKeyShortcut';

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'hero';
  autoFocus?: boolean;
  onSubmit?: (value: string) => void;
  className?: string;
}

export function SearchBar({
  defaultValue = '',
  placeholder = 'Buscar usuário do GitHub...',
  size = 'md',
  variant = 'default',
  autoFocus = false,
  onSubmit,
  className = '',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useKeyShortcut('k', focusInput);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;
    if (onSubmit) {
      onSubmit(value);
    } else {
      navigate(`/${encodeURIComponent(value)}`);
    }
    inputRef.current?.blur();
  };

  const inputClass =
    size === 'sm'
      ? 'form-control form-control-sm'
      : size === 'lg'
        ? 'form-control form-control-lg'
        : 'form-control';
  const groupClass =
    size === 'sm' ? 'input-group-sm' : size === 'lg' ? 'input-group-lg' : '';
  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className={`w-100 ${className}`.trim()}>
      <div
        className={`input-group ${isHero ? 'rounded-3 shadow-sm border overflow-hidden' : 'rounded'} ${groupClass}`}
      >
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search text-secondary" aria-hidden />
        </span>
        <input
          ref={inputRef}
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`${inputClass} border-start-0 ps-0`}
          aria-label={isHero ? 'Digite um nome de usuário' : 'Buscar usuário do GitHub'}
          autoComplete="username"
          autoFocus={autoFocus}
        />
        {isHero ? (
          <button
            type="submit"
            className="btn btn-primary rounded-0 px-3"
            aria-label="Buscar"
          >
            <i className="bi bi-arrow-right text-white" />
          </button>
        ) : (
          <span className="input-group-text bg-white border-start-0 d-none d-sm-flex align-items-center text-muted small">
            <kbd className="m-0 small">⌘K</kbd>
          </span>
        )}
      </div>
    </form>
  );
}
