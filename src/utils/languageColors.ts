/**
 * Language color hex values for repo cards and detail.
 */
export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

export function getLanguageColor(lang: string | null): string {
  if (!lang) return '#94a3b8';
  return LANGUAGE_COLORS[lang] ?? '#94a3b8';
}
