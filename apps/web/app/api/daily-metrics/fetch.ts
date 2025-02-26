export const fetchRevenueMetrics = async () => {
  const response = await fetch('revenue-metrics');
  const { data } = await response.json();
  return data;
};
