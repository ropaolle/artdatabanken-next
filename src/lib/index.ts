export const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const truncateString = (text: string | null, maxLength = 18) =>
  text ? (text.length > maxLength ? text.slice(0, maxLength - 1) + "&hellip;" : text) : "";
