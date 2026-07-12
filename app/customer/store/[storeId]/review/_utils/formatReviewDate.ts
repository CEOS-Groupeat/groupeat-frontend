export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = nowOnly.getTime() - dateOnly.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    if (diffDays === 0) return '오늘';
    if (diffDays < 0) return '오늘';
    return `${diffDays}일 전`;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
}
