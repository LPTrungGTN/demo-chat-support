export function formatDateTime(date: Date = new Date()): string {
  const now = new Date();

  if (date.getFullYear() !== now.getFullYear()) return `${date.getFullYear()}`;
  if (date.getMonth() !== now.getMonth()) return `${date.getMonth() + 1}`;
  if (date.getDay !== now.getDay) return `${date.getDate()}`;

  const hours = now.getHours() - date.getHours();
  const minutes = now.getMinutes() - date.getMinutes();

  if (hours === 0 && minutes === 0) return 'now';
  if (hours === 0) return `${minutes} phút`;
  return `${hours} giờ`;
}
