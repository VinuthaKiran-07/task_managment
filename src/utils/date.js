export function getDateKey(date = new Date()) {
  const value = new Date(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateLabel(
  dateKey,
  options = { month: "long", day: "numeric" },
) {
  return new Date(`${dateKey}T12:00:00`).toLocaleDateString(undefined, options);
}
