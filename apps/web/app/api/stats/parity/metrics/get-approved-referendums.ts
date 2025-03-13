import { getDailyOpenGovReferendaResults } from '../endpoints/open-gov-referenda';

export const getApprovedReferendums = async () => {
  const date = new Date(2023, 0, 1);

  const response = await getDailyOpenGovReferendaResults({
    chain: 'polkadot',
    relay_chain: 'polkadot',
    start_date: new Date('2025-01-01').toISOString().split('T')[0],
  });

  // Add approved referendums from 2025 onward to the 787 approved referendums in 2023-2024.
  const approvedReferendums =
    response.filter((referendum) => referendum.outcome === 'Approved').length +
    787;

  return approvedReferendums.toLocaleString();
};
