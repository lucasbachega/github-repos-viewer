export function getInitials(name: string | null, login: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    if (parts[0]) return parts[0].slice(0, 2).toUpperCase();
  }
  return login.slice(0, 2).toUpperCase();
}
