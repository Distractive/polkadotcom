import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Brand Hub', async ({ page }) => {
  await test.step('go to "Brand Hub" page', async () => {
    await page.goto('/community/brand-hub');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Brand Hub');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Fun first, quality always');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Fun first, quality always',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('We keep it playful yet')).toHaveText(
      "We keep it playful yet focused on delivering exceptional results. Explore Polkadot's official brand hub and download assets, including logos, fonts, color palettes, templates, presentation decks, and more.",
    );
    await expect(section.getByRole('link', { name: 'Download' })).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'polkadot dots graphic brand' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "logo" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-898992710721');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot logo',
      }),
    ).toBeVisible();
    await expect(section.getByText('Grab the Polkadot logo for')).toHaveText(
      "Grab the Polkadot logo for your next event or creation. All we ask is, please do not stretch, recolor, edit, or alter the logo in any way. It's perfect the way it is!",
    );
    await expect(
      section.getByRole('link', { name: 'SVG A flexible file that can' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'PNG Ideal for pixel-based' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'MP4 Polkadot and DOT token' }),
    ).toBeVisible();
  });

  await test.step('"logo" section screenshot', async () => {
    const section = page.getByTestId('cards-block-898992710721');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'logo.png',
      snapshotConfig,
    );
  });

  await test.step('assert "unbounded" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-b1e83a40bff7');

    await expect(
      section.getByRole('heading', {
        name: 'Unbounded',
      }),
    ).toBeVisible();
    await expect(section.getByText("The world's first open-source")).toHaveText(
      "The world's first open-source, freely accessible font, funded entirely onchain by the Polkadot Treasury.",
    );
    await expect(
      section.getByRole('link', { name: 'Google Fonts' }),
    ).toBeVisible();
    await expect(section.getByRole('link', { name: 'GitHub' })).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'example of polkadot header' }),
    ).toBeVisible();
  });

  await test.step('"unbounded" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-b1e83a40bff7');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'unbounded.png',
      snapshotConfig,
    );
  });

  await test.step('assert "pink" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Pink is our core',
      }),
    ).toBeVisible();
    await expect(section.getByText('But our ecosystem is as')).toHaveText(
      "But our ecosystem is as colorful as it is diverse. While we are grounded in pink, Polkadot's palette explores vibrant colors that inspire creativity and innovation that push beyond the core.",
    );
    await expect(
      section.getByRole('heading', { name: 'Polkadot Pink' }),
    ).toBeVisible();
    await expect(section.getByRole('heading', { name: 'Black' })).toBeVisible();
    await expect(section.getByRole('heading', { name: 'White' })).toBeVisible();
    await expect(section.getByRole('heading', { name: 'Lime' })).toBeVisible();
    await expect(section.getByRole('heading', { name: 'Cyan' })).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Violet' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Storm 200' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Storm 400' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Storm 700' }),
    ).toBeVisible();
  });

  await test.step('"pink" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'pink.png',
      snapshotConfig,
    );
  });

  await test.step('assert "hand" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Need a hand?',
      }),
    ).toBeVisible();
    await expect(section.getByText('We’re always adding high-')).toHaveText(
      'We’re always adding high-quality assets and templates for the community—free to use, customize, and create your way!',
    );
    await expect(
      section.getByRole('link', { name: 'Event booth Get your booth' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkadot deck Get inspired' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Asset library Dive in and' }),
    ).toBeVisible();
  });

  await test.step('"hand" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'hand.png',
      snapshotConfig,
    );
  });
});
