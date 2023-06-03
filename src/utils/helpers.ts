export const dateFormat = (dateString: string | Date) => {
  const date = new Date(dateString);

  const options = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };

  return date.toLocaleDateString("en-US", options);
};

export const yearFormat = (dateString: string | Date) => {
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date")
    return dateString.toString().slice(0, 4);

  const options = {
    year: "numeric" as const,
  };

  return date.toLocaleDateString("en-US", options);
};
