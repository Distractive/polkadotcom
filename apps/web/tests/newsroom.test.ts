import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Newsroom', async ({ page }) => {
  await test.step('go to "Newsroom" page', async () => {
    await page.goto('/community/newsroom');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Newsroom');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Newsroom');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Newsroom',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Explore highlights from the')).toHaveText(
      'Explore highlights from the press, fresh Polkadot news, and must-read stories from across the ecosystem',
    );
    await expect(
      section.getByRole('link', { name: 'Download Brand Kit' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Press Inquiry' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "stories" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-aa3c92a7db2d');

    await expect(
      section.getByRole('heading', {
        name: 'Recent stories',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'copper and velocity labs' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'harbour and velocity labs launch' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'evrloot launches',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'polkadot is the official global',
      }),
    ).toBeVisible();
  });

  await test.step('assert "mentions" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-ca63eb6f3ee9');

    await expect(
      section.getByRole('heading', {
        name: 'Recent mentions',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Nasdaq files to list Grayscale' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'What makes or breaks a blockchain' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'polkadot to launch first blockchain',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: '21shares files for a spot polkadot etf',
      }),
    ).toBeVisible();
  });

  await test.step('assert "featured" section is displayed properly', async () => {
    const section = page.getByTestId(
      'cards-block-c188658c825b3b0268979f1583ebe37b',
    );

    await expect(
      section.getByRole('heading', {
        name: 'Featured videos',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Blockchain  gaming: indie games' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'The Gray Paper interview' }),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await expect(
      section.getByRole('link', { name: 'Creating the Web3 future' }),
    ).toBeVisible();
  });

  await test.step('assert "communication" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Get in touch with our',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Press Kit For high-resolution' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Get in touch For all press' }),
    ).toBeVisible();
  });

  await test.step('"communication" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'communication.png',
      snapshotConfig,
    );
  });

  await test.step('assert "newsletter" section is displayed properly', async () => {
    const section = page.getByTestId('form-modal');

    await expect(
      section.getByRole('heading', {
        name: 'Stay in the loop with the',
      }),
    ).toBeVisible();
    await expect(section.getByText('Get your monthly fix of')).toHaveText(
      'Get your monthly fix of Polkadot updates, events, and scoop on the many incredible projects building on Polkadot.',
    );
    await expect(
      section.getByRole('button', { name: 'Subscribe' }),
    ).toBeVisible();
  });

  await test.step('"newsletter" section screenshot', async () => {
    const section = page.getByTestId('form-modal');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'newsletter.png',
      snapshotConfig,
    );
  });
});
