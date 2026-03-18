/**
 * Format number with locale; large numbers use "k" suffix.
 */
export function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
  }
  return n.toLocaleString('pt-BR');
}

/**
 * Format date in pt-BR short form (e.g. "12 mar", "5 jun").
 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
}
