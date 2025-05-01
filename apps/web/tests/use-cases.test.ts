import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Use Cases', async ({ page }) => {
  await test.step('go to use cases page', async () => {
    await page.goto('/use-cases');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Use Cases');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('The future runs on Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('header');
    await expect(section.getByText('From redefining finance to')).toHaveText(
      'From redefining finance to revolutionizing gaming and tokenizing the physical world, Polkadot is where ingenuity meets real-world impact. Built on a flexible foundation of seamless interoperability and shared security, Polkadot empowers creators, developers, and enterprises to push boundaries and build transformative solutions.',
    );
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "industries" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-c932a4156113');

    await expect(
      section.getByRole('heading', {
        name: 'Innovating across industries',
      }),
    ).toBeVisible();
    await expect(section.getByText('Explore the use cases')).toHaveText(
      'Explore the use cases reshaping industries and sparking imagination on Polkadot.',
    );
    await expect(
      section.getByRole('link', { name: 'Powering the next era of' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Bringing tangibles to' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Decentralizing infrastructure' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Decentralizing artificial' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Redefining global finance' }),
    ).toBeVisible();
  });

  await test.step('"industries" section screenshot', async () => {
    const section = page.getByTestId('cards-block-c932a4156113');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'industries.png',
      snapshotConfig,
    );
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', { name: '"Choosing Polkadot was a ‘no-' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: '"Choosing Polkadot was a ‘no-' }),
    ).toHaveText(
      '"Choosing Polkadot was a ‘no-brainer’ for Acurast. Its technical maturity and thriving ecosystem allowed us to start with confidence, knowing we had a scalable foundation and an enthusiastic community that would support our journey toward a decentralized cloud.”',
    );
  });

  await test.step('"quote" section screenshot', async () => {
    const section = page.getByTestId('quote-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'quote.png',
      snapshotConfig,
    );
  });

  await test.step('assert "by numbers" section is displayed properly', async () => {
    const section = page.getByTestId('cards-stat');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot by the numbers',
      }),
    ).toBeVisible();
  });

  await test.step('"by numbers" section screenshot', async () => {
    const section = page.getByTestId('cards-stat');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'by-numbers.png',
      snapshotConfig,
    );
  });
});
