export function formatPickupTime(time: string): string {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  if (minute > 0) {
    return `${period} ${displayHour}시 ${minute}분`;
  }
  return `${period} ${displayHour}시`;
}

export function formatPickupDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
}
