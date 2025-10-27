import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('DAO', async ({ page }) => {
  await test.step('go to "DAO" page', async () => {
    await page.goto('/platform/dao');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle(
      "Polkadot DAO | The World's Largest DAO is Here",
    );
    const heading = page.locator('h1');
    await expect(heading).toHaveText('You run Polkadot. Seriously.');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'You run Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('With just a wallet')).toHaveText(
      'With just a wallet and some DOT, you can vote, propose, and participate in the onchain decision-making that shapes the network.',
    );
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "decentralization" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Get involved in 3 easy steps',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Step 1' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Step 2' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Step 3' }),
    ).toBeVisible();
  });

  await test.step('"decentralization" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'decentralization.png',
      snapshotConfig,
    );
  });

  await test.step('assert "join" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-66f97030f3ca');

    await expect(
      section.getByRole('heading', {
        name: 'Why join Polkadot DAO?',
      }),
    ).toBeVisible();
    await expect(section.getByText('Joining Polkadot DAO')).toHaveText(
      'Joining Polkadot DAO means more than just voting. It’s your opportunity to shape the direction of a decentralized ecosystem, earn recognition for your contributions, and connect with others building the future of the internet.',
    );
    await expect(section.getByText('Shape the future')).toBeVisible();
    await expect(section.getByText('Earn rewards')).toBeVisible();
    await expect(section.getByText('Build community')).toBeVisible();
    await expect(section.getByText('Delegate your vote')).toBeVisible();
  });

  await test.step('"join" section screenshot', async () => {
    const section = page.getByTestId('cards-block-66f97030f3ca');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'join.png',
      snapshotConfig,
    );
  });

  await test.step('assert "stats" section is displayed properly', async () => {
    const section = page.getByTestId('cards-stat');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot DAO by the numbers',
      }),
    ).toBeVisible();
    await expect(section.getByText('DAO members')).toBeVisible();
    await expect(section.getByText('Submitted to OpenGov')).toBeVisible();
    await expect(
      section.getByText('DOT available in Treasury pool'),
    ).toBeVisible();
  });

  await test.step('"democracy" section screenshot', async () => {
    const section = page.getByTestId('cards-stat');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'democracy.png',
      snapshotConfig,
    );
  });

  await test.step('assert "new-benefits" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-6c5f350b7323');

    await expect(
      section.getByRole('heading', {
        name: 'New to DAOs? Start here',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'What is Polkadot DAO' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'How to get involved' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'What is a DAO' }),
    ).toBeVisible();
  });

  // await test.step('"benefits" section screenshot', async () => {
  //   const section = page.getByTestId('cards-block-6c5f350b7323');
  //   await page.waitForTimeout(2000);
  //   expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
  //     'benefits.png',
  //     snapshotConfig,
  //   );
  // });

  await test.step('assert "initiatives" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-e1516f9dc848');

    await expect(
      section.getByRole('heading', {
        name: 'Latest decentralized',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'DAO backs DeFi with 3M DOT' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Pioneering sports sponsorship' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'New Polkadot Ledger app' }),
    ).toBeVisible();
  });

  // await test.step('"initiatives" section screenshot', async () => {
  //   const section = page.getByTestId('cards-block-e1516f9dc848');
  //   await page.waitForTimeout(2000);
  //   expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
  //     'initiatives.png',
  //     snapshotConfig,
  //   );
  // });
});
