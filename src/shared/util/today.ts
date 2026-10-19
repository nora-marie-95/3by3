const DATE_KEY_LENGTH = 2;

/** A local calendar day as "YYYY-MM-DD" — sorts and compares correctly as a plain string. */
export const todayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(DATE_KEY_LENGTH, "0");
  const day = String(now.getDate()).padStart(DATE_KEY_LENGTH, "0");
  return `${year}-${month}-${day}`;
};
