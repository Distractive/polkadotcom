import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Community', async ({ page }) => {
  await test.step('go to "community" page', async () => {
    await page.goto('/community');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Community');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Come play with Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('header');
    await expect(section.getByText("Whether you're a crypto")).toHaveText(
      "Whether you're a crypto newbie or a seasoned developer, there's something for you here.",
    );

    await expect(
      section.getByRole('button', { name: 'Explore ecosystem' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "DAO" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Jump into the world’s largest',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'About Learn more about how' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Decentralized Jobs Explore' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Blog Read the blog for the' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Newsroom Catch up on the top' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Ambassador Program Share your' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Contact Got a burning' }),
    ).toBeVisible();
  });

  await test.step('"DAO" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'dao.png',
      snapshotConfig,
    );
  });

  await test.step('assert "Get involved" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Get involved',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Events Hang with the Polkadot' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Forum Explore a vibrant hub' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Ambassador Program Join a' }),
    ).toBeVisible();
  });

  await test.step('"Get involved" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'get-involved.png',
      snapshotConfig,
    );
  });

  await test.step('assert "subscribe" section is displayed properly', async () => {
    const section = page.getByTestId('form-modal');

    await expect(
      section.getByRole('heading', {
        name: 'Keep up with the culture',
      }),
    ).toBeVisible();
    await expect(section.getByText('Subscribe to the newsletter')).toHaveText(
      'Subscribe to the newsletter for monthly updates on all things Polkadot.',
    );
    await expect(
      section.getByRole('button', { name: 'Subscribe' }),
    ).toBeVisible();
  });

  await test.step('"subscribe" section screenshot', async () => {
    const section = page.getByTestId('form-modal');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'subscribe.png',
      snapshotConfig,
    );
  });
});
