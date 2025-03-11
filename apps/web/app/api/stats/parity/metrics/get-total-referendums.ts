import { getDailyOpenGovReferendaResults } from '../endpoints/open-gov-referenda';

export const getTotalReferendums = async () => {
  const response = await getDailyOpenGovReferendaResults({
    chain: 'polkadot',
    relay_chain: 'polkadot',
  });

  const totalReferendum =
    response[response.length - 1]?.referendum_index.toLocaleString();

  return totalReferendum;
};
