import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Assets', async ({ page }) => {
  await test.step('go to "Assets" page', async () => {
    await page.goto('/use-cases/real-world-assets');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Real-World Assets');
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'The future of real-world assets lives on Polkadot',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'The future of real-world',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Unlock endless possibilities')).toHaveText(
      'Unlock endless possibilities by bringing real-world assets (RWAs) onchain with Polkadot. From real estate and commodities to intellectual property, Polkadot’s trusted multichain foundation empowers seamless tokenization and efficient asset management, transforming RWAs into liquid, transferable digital assets.',
    );
    await expect(
      section.getByRole('link', { name: 'Get funding' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "assets" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-57d3ee6e9dab');

    await expect(
      section.getByRole('heading', {
        name: 'Real-world applications for',
      }),
    ).toBeVisible();
    await expect(section.getByText('Tokenizing real-world assets')).toHaveText(
      "Tokenizing real-world assets unlocks a wealth of opportunities across industries. From improving operational efficiency to creating new financial products, Polkadot's powerful ecosystem is the foundation for diverse, innovative applications of RWAs.",
    );
    await expect(
      section.getByRole('heading', { name: 'Unlock new financing models' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Enable fractional ownership' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Transform intellectual' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Enhance sustainable energy' }),
    ).toBeVisible();
  });

  await test.step('assert "edge" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot’s edge in real-world',
      }),
    ).toBeVisible();
    await expect(section.getByText('With fast transactions, a')).toHaveText(
      'With fast transactions, a robust security model, and unparalleled customization options, Polkadot brings real-world assets to life onchain.',
    );
    await expect(
      section.getByRole('heading', { name: 'Boundless liquidity across' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Compliance without the hassle' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Ironclad security without the' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Custom solutions, simplified' }),
    ).toBeVisible();
  });

  await test.step('"edge" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'edge.png',
      snapshotConfig,
    );
  });

  await test.step('assert "action" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-1dc493a5f8a5');

    await expect(
      section.getByRole('heading', {
        name: 'Tokenized assets in action',
      }),
    ).toBeVisible();
    await expect(section.getByText('Explore groundbreaking')).toHaveText(
      'Explore groundbreaking projects leveraging Polkadot for asset tokenization and innovation.',
    );
    await expect(
      section.getByRole('link', { name: 'How Centrifuge built a $661M' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Energy Web is transforming' }),
    ).toBeVisible();
  });

  await test.step('"action" section screenshot', async () => {
    const section = page.getByTestId('cards-block-1dc493a5f8a5');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'action.png',
      snapshotConfig,
    );
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', {
        name: 'Energy Web is on a mission to',
      }),
    ).toBeVisible();
  });

  await test.step('assert "careers" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-94ff34ddfc9c');

    await expect(
      section.getByRole('heading', {
        name: 'Careers in RWA innovation',
      }),
    ).toBeVisible();
    await expect(section.getByText('The tokenization of real-')).toHaveText(
      'The tokenization of real-world assets (RWAs) is unlocking new opportunities across industries, driving demand for experts in blockchain, compliance, asset management, and more. Join the RWA revolution.',
    );
    await expect(
      section.getByRole('link', { name: 'Explore jobs' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"careers" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-94ff34ddfc9c');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'careers.png',
      snapshotConfig,
    );
  });

  await test.step('assert "faqs" section is displayed properly', async () => {
    const section = page.getByTestId('faqs');

    await expect(
      section.getByRole('heading', {
        name: 'FAQs about real-world assets',
      }),
    ).toBeVisible();
  });
});
