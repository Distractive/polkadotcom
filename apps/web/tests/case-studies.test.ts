import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Case Studies', async ({ page }) => {
  await test.step('go to "Case Studies" page', async () => {
    await page.goto('/case-studies');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Polkadot Case Studies');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Case studies');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('platform-header');

    await expect(
      section.getByRole('heading', {
        name: 'Case studies',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Discover how teams use')).toHaveText(
      "Discover how teams use Polkadot's secure, modular, and scalable blockchain technology to drive breakthroughs in decentralized finance, AI, and beyond.",
    );
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('platform-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "cases" section is displayed properly', async () => {
    const section = page.getByTestId('main-content');

    await expect(section.getByTestId('blog-search')).toBeVisible();
    await expect(section.getByText('Page: 1 of')).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Energy Web drives the clean' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Hyperbridge creates a fully' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Transforming trust in the age' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'How Centrifuge built a $661M' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Mythical Games revolutionizes' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'How Bifrost redefines cross-' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Acurast is building the' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'How Polimec disrupts' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Hydration optimizes liquidity' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Chainflip powers secure and' }),
    ).toBeVisible();
  });

  await test.step('"cases" section screenshot', async () => {
    const section = page.getByTestId('main-content');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'cases.png',
      snapshotConfig,
    );
  });
});
