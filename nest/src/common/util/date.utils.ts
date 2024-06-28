export function formatDateTime(date: Date = new Date()): string {
  const now = new Date();

  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  if (utcDate.getFullYear() !== now.getFullYear())
    return `${utcDate.getFullYear()}`;
  if (
    utcDate.getDate() !== now.getDate() ||
    utcDate.getMonth() !== now.getMonth()
  )
    return `${utcDate.getDate()}/${utcDate.getMonth() + 1}`;

  const hours = now.getUTCHours() - utcDate.getUTCHours();
  const minutes = now.getUTCMinutes() - utcDate.getUTCMinutes();

  if (hours === 0 && minutes === 0) return 'now';
  if (hours === 0) return `${minutes}'`;
  return `${hours}h`;
}
