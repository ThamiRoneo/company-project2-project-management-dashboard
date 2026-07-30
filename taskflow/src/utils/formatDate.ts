/**
 * Format a date string into a human-readable format.
 * Examples: "Jan 15, 2026" or "15 Jan 2026"
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("en-ZA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Return a relative label like "Today", "Tomorrow", "3 days left",
 * or "Overdue by 2 days".
 */
export function relativeDate(dateStr: string): string {
  if (!dateStr) return "";

  const now = new Date();
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / 86_400_000);

  if (days < 0) return `Overdue by ${Math.abs(days)}d`;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days}d left`;
}

/**
 * Return a short date like "Jan 15" for lists.
 */
export function shortDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("en-ZA", {
    month: "short",
    day: "numeric",
  });
}
