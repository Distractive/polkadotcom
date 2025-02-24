import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Stake', async ({ page }) => {
  await test.step('go to "dapps" page', async () => {
    await page.goto('/get-started/staking');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Staking');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Stake your claim');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Stake your claim',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Lock up your DOT tokens to')).toHaveText(
      'Lock up your DOT tokens to help secure the Polkadot network and gain rewards. Start staking with as little as 1 DOT.',
    );
    await expect(
      section.getByRole('link', { name: 'Start staking' }),
    ).toBeVisible();
    await expect(section.getByTestId('video-block')).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "metrics" section is displayed properly', async () => {
    const section = page.getByTestId('cards-stat');

    await expect(
      section.getByRole('heading', {
        name: 'Staking metrics',
      }),
    ).toBeVisible();
    await expect(section.getByText('36,967Total Nominators*')).toBeVisible();
    await expect(section.getByText('~58.46%Total DOT Supply')).toBeVisible();
    await expect(section.getByText('%Historical Rewards Rate**')).toBeVisible();
    await expect(section.getByText('297active validators')).toBeVisible();
    await expect(
      section.getByText('* As of July 30, 2024 **The'),
    ).toBeVisible();
  });

  await test.step('"metrics" section screenshot', async () => {
    const section = page.getByTestId('cards-stat');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'metrics.png',
      snapshotConfig,
    );
  });

  await test.step('assert "staking" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: "Let's get staking",
      }),
    ).toBeVisible();
    await expect(section.getByText('Step into the exciting world')).toHaveText(
      "Step into the exciting world of staking with DOT and discover how you can earn rewards while contributing to the network's resiliency. Whether you're new to staking or a seasoned staker, there are plenty of options to explore.",
    );
    await expect(
      section.getByRole('link', { name: 'Ready to put your DOT to work' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: "Stay in the driver's seat" }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Ready to put your DOT to work' }),
    ).toBeVisible();
  });

  await test.step('"staking" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'staking.png',
      snapshotConfig,
    );
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', {
        name: '“The new staking dashboard is',
      }),
    ).toHaveText(
      '“The new staking dashboard is seamless to operate so that it empowers any token holder to contribute to the security and maintenance of the network—irrespective of technical knowledge.”',
    );
  });

  await test.step('assert "accordion" section is displayed properly', async () => {
    const section = page.getByTestId('accordion');

    await expect(
      section.getByRole('heading', {
        name: 'Compare your staking options',
      }),
    ).toBeVisible();
    const text1 = section
      .getByRole('region', { name: "Open 'Native staking' content" })
      .locator('div');
    const text2 = section
      .getByRole('region', { name: "Open 'Third-party" })
      .locator('div');
    const button1 = section.getByRole('button', {
      name: "Open 'Native staking' content",
    });
    const button2 = section.getByRole('button', { name: "Open 'Third-party" });
    await expect(button1).toBeVisible();
    await expect(text1).toBeVisible();
    await expect(text2).toBeHidden();
    await expect(button2).toBeVisible();
    await button2.click({ timeout: 2000 });
    await expect(text2).toBeVisible();
    await expect(text1).toBeHidden();
    await expect(
      section.getByRole('button', { name: "Open 'Custodial exchanges'" }),
    ).toBeVisible();
  });

  await test.step('"accordion" section screenshot', async () => {
    const section = page.getByTestId('accordion');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'accordion.png',
      snapshotConfig,
    );
  });

  await test.step('assert "hardware staking" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-d0fd69b5942c');

    await expect(
      section.getByRole('heading', {
        name: 'Staking with hardware wallets',
      }),
    ).toBeVisible();
    await expect(section.getByText('Consider using a secure')).toHaveText(
      'Consider using a secure hardware wallet that has integrated the Polkadot Staking Dashboard when staking significant amounts of DOT.',
    );
    await expect(section.getByText('Ledger supports staking on')).toHaveText(
      'Ledger supports staking on the Polkadot staking dashboard with a minimum of 254 DOT (as of May 2024).',
    );
    await expect(
      section.getByRole('link', { name: 'Explore Ledger' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });
});
