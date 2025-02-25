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
      section.getByRole('link', { name: 'Harbour and Velocity Labs' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Evrloot launches Free-to-play' }),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await expect(
      section.getByRole('link', { name: 'Hyperbridge launches on' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Acurast unveils processor' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'See all stories' }),
    ).toBeVisible();
  });

  await test.step('"stories" section screenshot', async () => {
    const section = page.getByTestId('cards-block-aa3c92a7db2d');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'stories.png',
      snapshotConfig,
    );
  });

  await test.step('assert "mentions" section is displayed properly', async () => {
    const section = page.getByTestId(
      'cards-block-657597c72144db898dddbdee9bcc4f8c',
    );

    await expect(
      section.getByRole('heading', {
        name: 'Recent mentions',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkadot ecosystem thriving' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: '21shares registers Polkadot' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Mandala Chain, powered by' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'Polkadot ecosystem transactions triple since January 2024 Read more',
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
      section.getByRole('link', { name: 'Documentary Blockchain gaming' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Behind the Code The Gray' }),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await expect(
      section.getByRole('link', { name: 'Behind the Code The Gray' }),
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
