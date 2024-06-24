export function formatDateTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateOfMessage = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  if (dateOfMessage.getTime() !== today.getTime())
    return `${date.getDate()}/${date.getMonth() + 1}`;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours === 0 && minutes < 60) return `${minutes} phút`;

  return `${hours} giờ`;
}
