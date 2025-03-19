import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('DeFi', async ({ page }) => {
  await test.step('go to "DeFi" page', async () => {
    await page.goto('/use-cases/defi');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('DeFi');
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'Decentralized Finance (DeFi) reinvented on Polkadot',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Decentralized Finance (DeFi)',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Unlock the full potential of')).toHaveText(
      "Unlock the full potential of DeFi on Polkadot, where scalability, security, and interoperability enable transformative financial services. Transform financial services and build robust, interconnected ecosystems powered by Polkadot's advanced architecture.",
    );
    await expect(
      section.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Get funding' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "build future" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-2e59569b9fd9');

    await expect(
      section.getByRole('heading', {
        name: 'Build the future of finance',
      }),
    ).toBeVisible();
    await expect(section.getByText('From decentralized exchanges')).toHaveText(
      'From decentralized exchanges (DEXes) to tokenized assets and stablecoins, Polkadot equips DeFi innovators with tools to reimagine financial ecosystems and create groundbreaking solutions.',
    );
    await expect(
      section.getByRole('heading', { name: 'Reimagine decentralized' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'DAO-driven finance' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Revolutionize money markets' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Build transparent derivatives' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Maximize returns with smart' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Enable cost-effective' }),
    ).toBeVisible();
  });

  await test.step('"build future" section screenshot', async () => {
    const section = page.getByTestId('cards-block-2e59569b9fd9');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'build-future.png',
      snapshotConfig,
    );
  });

  await test.step('assert "no-boundaries" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-1ca6fdda3a37');

    await expect(
      section.getByRole('heading', {
        name: 'Build DeFi without boundaries',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot removes trade-offs')).toHaveText(
      'Polkadot removes trade-offs between security, scalability, and interoperability. Build your DeFi platform with the freedom to scale, connect, and innovate—all while maintaining institutional-grade security and iron-clad resilience.',
    );
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"no-boundaries" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-1ca6fdda3a37');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'no-boundaries.png',
      snapshotConfig,
    );
  });

  await test.step('assert "performance" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Reliable performance for',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot delivers the')).toHaveText(
      'Polkadot delivers the performance and reliability DeFi platforms need to scale globally and operate seamlessly around the clock.',
    );
    await expect(
      section.getByRole('heading', { name: 'Unlimited scale, unlimited' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Cross-chain confidence' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Enterprise security, zero' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Open governance for DeFi' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Modular compliance tools' }),
    ).toBeVisible();
  });

  await test.step('assert "in action" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-b74c28b151b5');

    await expect(
      section.getByRole('heading', {
        name: 'DeFi in action: powered by',
      }),
    ).toBeVisible();
    await expect(section.getByText('From decentralized exchanges')).toHaveText(
      'From decentralized exchanges to cross-chain liquidity protocols, explore how Polkadot powers DeFi projects that redefine financial freedom.',
    );
    await expect(
      section.getByRole('link', { name: 'Hydration optimizes liquidity' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Chainflip powers secure and' }),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await expect(
      section.getByRole('link', { name: 'How Polimec disrupts' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'How Bifrost redefines cross-' }),
    ).toBeVisible();
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByText('“With Polkadot, we are able'),
    ).toBeVisible();
  });

  await test.step('"quote" section screenshot', async () => {
    const section = page.getByTestId('quote-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'quote.png',
      snapshotConfig,
    );
  });

  await test.step('assert "dao" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-341907d33edc');

    await expect(
      section.getByRole('heading', {
        name: 'Empowering decentralization:',
      }),
    ).toBeVisible();
    await expect(section.getByText('Discover how Polkadot’s')).toHaveText(
      'Discover how Polkadot’s community-driven DAO allocated 3M DOT to fuel DeFi growth, enhancing liquidity for innovative projects like Hydration and StellaSwap.',
    );
    await expect(
      section.getByRole('link', { name: 'Read the blog' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"dao" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-341907d33edc');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'dao.png',
      snapshotConfig,
    );
  });

  await test.step('assert "career" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-e58b7421538d');

    await expect(
      section.getByRole('heading', {
        name: 'DeFi jobs: build your career',
      }),
    ).toBeVisible();
    await expect(section.getByText('Explore exciting DeFi job')).toHaveText(
      'Explore exciting DeFi job opportunities in Polkadot’s ecosystem. From developers to strategists, join a global movement transforming finance with hyper-scalable and secure blockchain technology.',
    );
    await expect(
      section.getByRole('link', { name: 'Explore jobs' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"career" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-e58b7421538d');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'career.png',
      snapshotConfig,
    );
  });

  await test.step('assert "faqs" section is displayed properly', async () => {
    const section = page.getByTestId('faqs');

    await expect(
      section.getByRole('heading', {
        name: 'Your DeFi questions answered',
      }),
    ).toBeVisible();
  });
});
