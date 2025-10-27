import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Platform', async ({ page }) => {
  await test.step('go to platform page', async () => {
    await page.goto('/platform');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle(
      'Polkadot Platform | The Fastest, Most Secure & Scalable Blockchain Platform',
    );
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'The fastest, most secure platform for Web3 at scale',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(section.getByText('Polkadot gives developers')).toHaveText(
      'Polkadot gives developers the tools to launch Ethereum-compatible smart contracts, custom appchains, and sovereign rollups on a high-performance blockchain platform engineered for speed, security, and scalability.',
    );

    await expect(
      section.getByRole('link', { name: 'Start building' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('"cards-small-block" first section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(0);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'cards-small-first.png',
      snapshotConfig,
    );
  });

  await test.step('"cards-small-block" second section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'cards-small-second.png',
      snapshotConfig,
    );
  });

  await test.step('"cards-small-block" third section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(2);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'cards-small-third.png',
      snapshotConfig,
    );
  });

  await test.step('"cards-small-block" fourth section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(3);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'cards-small-fourth.png',
      snapshotConfig,
    );
  });

  await test.step('"timeline" section screenshot', async () => {
    const section = page.getByTestId('timeline');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'timeline.png',
      snapshotConfig,
    );
  });
});
