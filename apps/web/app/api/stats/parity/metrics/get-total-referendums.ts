import { getDailyOpenGovReferendaResults } from '../endpoints/open-gov-referenda';

export const getTotalReferendums = async () => {
  // set date two weeks in the past to make sure we get at least one open referendum to pull the latest index number from.
  const date = new Date();
  date.setDate(date.getDate() - 14);

  const response = await getDailyOpenGovReferendaResults({
    chain: 'polkadot',
    relay_chain: 'polkadot',
    start_date: date.toISOString().split('T')[0],
  });

  const totalReferendum = response[response.length - 1]?.referendum_index;

  return totalReferendum;
};
