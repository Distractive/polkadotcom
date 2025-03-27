import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Events', async ({ page }) => {
  await test.step('go to "Events" page', async () => {
    await page.goto('/community/events');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Events');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Come find your people');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Come find your people',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Join us at upcoming virtual')).toHaveText(
      'Join us at upcoming virtual or in-person events to stay up-to-date on industry trends and network with peers across Web3.',
    );
    await expect(
      section.getByRole('img', { name: 'Audience member at a Polkadot' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "past events" section is displayed properly', async () => {
    const section = page.getByTestId(
      'cards-block-e4dd0438ac1dd6c40d7125c21091e263',
    );

    await expect(
      section.getByRole('heading', {
        name: 'Past Events',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'November 10–13, 2024 Devcon 7' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'November 9–11, 2024 Sub0' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'October 8-10, 2024 Merge' }),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await expect(
      section.getByRole('link', { name: 'September 25-26, 2024' }),
    ).toBeVisible();
  });

  await test.step('assert "community" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Community buzz',
      }),
    ).toBeVisible();
    await expect(section.getByText('Immerse yourself in the')).toHaveText(
      /Immerse yourself in the Polkadot ecosystem by joining community-led events or hosting your own. Explore everything from local meetups to global hackathons—there's something for everyone.\s*/,
    );
    await expect(
      section.getByRole('link', { name: 'Local events' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: "Tell us what's up" }),
    ).toBeVisible();
  });

  await test.step('"community" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'community.png',
      snapshotConfig,
    );
  });

  await test.step('assert "form-modal" section is displayed properly', async () => {
    const section = page.getByTestId('form-modal');

    await expect(
      section.getByRole('heading', {
        name: 'Don’t miss out on the next',
      }),
    ).toBeVisible();
    await expect(section.getByText('Subscribe to the Polkadot')).toHaveText(
      'Subscribe to the Polkadot newsletter to get the latest updates on upcoming events and recaps of previous events around the world.    ',
    );
    await expect(
      section.getByRole('button', { name: 'Sign-up' }),
    ).toBeVisible();
  });

  await test.step('"form-modal" section screenshot', async () => {
    const section = page.getByTestId('form-modal');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'form-modal.png',
      snapshotConfig,
    );
  });
});
