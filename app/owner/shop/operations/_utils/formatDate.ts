export function formatDateWithDots(dateString: string): string {
  return dateString.replace(/-/g, '.');
}
