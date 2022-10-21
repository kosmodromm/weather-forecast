export function getFormattedDate(date: string): string {
  return new Date(date).toDateString();
}
