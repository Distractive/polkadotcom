export const getLastDayOfPreviousMonth = (): string => {
  // Add 3 day cushion since API takes a couple days to update
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const firstDayOfCurrentMonth = new Date(
    threeDaysAgo.getFullYear(),
    threeDaysAgo.getMonth(),
    1,
  );

  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
  lastDayOfPreviousMonth.setHours(0, 0, 0, 0);

  return lastDayOfPreviousMonth.toISOString().split('T')[0] ?? '';
};
