import { setTimeout } from 'node:timers/promises';
import { Vercel } from '@vercel/sdk';
import type { GetDeploymentsState } from '@vercel/sdk/models/getdeploymentsop.js';

const { VERCEL_APP, VERCEL_PROJECT_ID, VERCEL_TEAM_ID, VERCEL_TOKEN, BRANCH } =
  process.env;

if (
  !VERCEL_APP ||
  !VERCEL_PROJECT_ID ||
  !VERCEL_TEAM_ID ||
  !VERCEL_TOKEN ||
  !BRANCH
) {
  throw new Error(
    'Missing one of deployment variables: VERCEL_APP, VERCEL_PROJECT_ID, VERCEL_TEAM_ID, VERCEL_TOKEN, BRANCH ',
  );
}

const EXIT_STATES: GetDeploymentsState[] = ['DELETED', 'CANCELED', 'ERROR'];

const vercel = new Vercel({
  bearerToken: VERCEL_TOKEN,
});

for (let index = 0; index < 50; index++) {
  const deployment = await getDeployment();

  if (!deployment?.state) {
    await setTimeout(10_000);
    continue;
  }

  if (EXIT_STATES.includes(deployment.state)) {
    throw new Error(`Deployment stopped with state: ${deployment.state}`);
  }

  if (deployment.state === 'READY') {
    console.log(`https://${deployment.url}`);
    process.exit(0);
  }

  await setTimeout(10_000);
}

throw new Error('Failed to get deployment URL');

async function getDeployment() {
  const response = await vercel.deployments.getDeployments({
    app: VERCEL_APP,
    projectId: VERCEL_PROJECT_ID,
    teamId: VERCEL_TEAM_ID,
  });

  if (!response.deployments.length) {
    throw new Error('No deployments found');
  }

  return response.deployments.find(
    (deployment) => deployment.meta?.githubCommitRef === BRANCH,
  );
}
