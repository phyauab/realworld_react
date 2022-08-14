export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-GB", {
    month: "long",
  });
  const day = date.toLocaleString("en-GB", {
    day: "2-digit",
  });
  const year = date.toLocaleString("en-GB", { year: "numeric" });
  return `${month} ${day}, ${year}`;
}
