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

  await test.step('assert "champion" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'A Growing Movement',
      }),
    ).toBeVisible();
    await expect(section.getByText('In Q1 2025')).toHaveText(
      "In Q1 2025, we successfully onboarded 160 ambassadors across 6 continents. Together, we're shaping the future of decentralised coordination — from governance education and grassroots local meetups, to collaborative content creation and community growth. We're currently building out the Fellowship framework in close collaboration with the community. Expect new roles, resources, and tools to support your journey in Polkadot.",
    );
    await expect(
      section.getByRole('heading', { name: 'Share knowledge and expertis' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Learn new skills' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Connect with like-minded' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Be the voice of the community' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Receive funding for hosting' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Attend Polkadot events' }),
    ).toBeVisible();
  });

  await test.step('"champion" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'champion.png',
      snapshotConfig,
    );
  });

  await test.step('assert "get involved" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Ways to get involved',
      }),
    ).toBeVisible();
    await expect(section.getByText('The Fellowship is open')).toHaveText(
      ' The Fellowship is open to everyone willing to commit their time and unique skills — from curious newcomers to ecosystem veterans. As a Fellow, you’ll:',
    );
    await expect(
      section.getByRole('heading', { name: 'Speak at events' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Write blog posts' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Represent in your region' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Mentor and onboard' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Identify partnerships' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Participate in community' }),
    ).toBeVisible();
  });

  await test.step('"get involver" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'get-involved.png',
      snapshotConfig,
    );
  });

  await test.step('assert "ambassador" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-e3f39b1c7ff0');

    await expect(
      section.getByRole('heading', {
        name: 'Join the movement. Share your knowledge. Build the future.',
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
