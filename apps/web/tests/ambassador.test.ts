import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Ambassador Program', async ({ page }) => {
  await test.step('go to "Ambassador Program" page', async () => {
    await page.goto('/community/ambassador-program');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Ambassador Program');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('The Polkadot Ambassador Fellowship');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'The Polkadot Ambassador Fellowship',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Building the future')).toHaveText(
      "Building the future of Polkadot, together. The Polkadot Ambassador Fellowship is a community-led initiative designed to support the next generation of ecosystem advocates. Whether you're a builder, educator, organiser, or explorer — there's a place for you in the Fellowship.",
    );
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "growing movement" section is displayed properly', async () => {
    const section = page.getByTestId('content-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'A Growing Movement',
      }),
    ).toBeVisible();

    await expect(section.getByText('In Q1 2025')).toHaveText(
      "In Q1 2025, we successfully onboarded 160 ambassadors across 6 continents. Together, we're shaping the future of decentralised coordination — from governance education and grassroots local meetups, to collaborative content creation and community growth.",
    );
  });

  await test.step('assert "get involved" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'Ways to get involved',
      }),
    ).toBeVisible();

    await expect(
      section.getByRole('heading', { name: 'Share knowledge' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Grow the Community' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Champion the Network' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Bridge ecosystems' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Advise. Support. Mentor' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Find Your Niche' }),
    ).toBeVisible();
  });

  await test.step('"involved" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'champion.png',
      snapshotConfig,
    );
  });

  await test.step('assert "ambassador" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-e3f39b1c7ff0');

    await expect(
      section.getByRole('heading', {
        name: 'Start your Journey',
      }),
    ).toBeVisible();
    await expect(section.getByText('Want to co-create')).toHaveText(
      "Want to co-create the future of the Fellowship? Whether you're a content creator, translator, BD lead, or event host — there’s space for you to contribute.",
    );
  });

  await test.step('"ambassador" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-e3f39b1c7ff0');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'ambassador.png',
      snapshotConfig,
    );
  });
});