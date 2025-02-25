import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Decentralized Jobs', async ({ page }) => {
  await test.step('go to "Decentralized Jobs" page', async () => {
    await page.goto('/community/decentralized-jobs');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Decentralized Jobs');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Decentralized jobs');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Decentralized jobs',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Polkadot is a decentralized')).toHaveText(
      'Polkadot is a decentralized network made up of many teams working together towards one shared vision—to create a more open, decentralized internet for all.',
    );
    await expect(
      section.getByRole('link', { name: 'Work with us' }),
    ).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Remote person on a laptop' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "teams" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Meet some of the',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Web3 Foundation Stewards and' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Parity Engineers driving' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Distractive Full-service' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'PoKe Key account and business' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkaport East Central hub in' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Accelerate Polkadot Code-' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'See more teams' }),
    ).toBeVisible();
  });

  await test.step('"teams" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'teams.png',
      snapshotConfig,
    );
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', { name: '“Decentralization is a' }),
    ).toBeVisible();
  });

  await test.step('"quote" section screenshot', async () => {
    const section = page.getByTestId('quote-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'quote.png',
      snapshotConfig,
    );
  });

  await test.step('assert "job" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-dd81681380d9');

    await expect(
      section.getByRole('heading', {
        name: 'Land your dream job in web3',
      }),
    ).toBeVisible();
    await expect(section.getByText('See the open position')).toHaveText(
      'See the open position available across the Polkadot ecosystem below.',
    );
    await expect(
      section.getByRole('link', { name: 'See open jobs' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Get your job listed' }),
    ).toBeVisible();
  });

  await test.step('"job" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-dd81681380d9');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'job.png',
      snapshotConfig,
    );
  });
});
