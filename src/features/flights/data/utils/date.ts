export const createDateFromStrings = (
  dateString: string,
  timeString: string,
) => {
  // Assert this, as we can be sure the data from flights.json will always have the same string format
  const [year, month, day] = dateString.split("-").map(Number) as [
    number,
    number,
    number,
  ];

  const [hour, minute] = timeString.split(":").map(Number) as [number, number];

  return new Date(Date.UTC(year, month - 1, day, hour, minute));
};
