// converts an ISO date string into something readable, e.g. "July 25, 2026"
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// lesedi