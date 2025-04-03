import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Chain', async ({ page }) => {
  await test.step('go to "Chain" page', async () => {
    await page.goto('/platform/chain');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Chain');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('The heartbeat of next-gen blockchain');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'The heartbeat of next-gen',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Polkadot Chain taps into $6B')).toHaveText(
      'Polkadot Chain taps into $6B in economic security and unrivaled connectivity with flexible on-demand computing.',
    );
    await expect(
      section.getByRole('link', { name: 'Intro to Polkadot SDK' }),
    ).toBeVisible();
    await expect(section.getByTestId('video-block')).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "chain" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'A chain that redefines the',
      }),
    ).toBeVisible();
    await expect(section.getByText('Efficiency perfected.')).toHaveText(
      'Efficiency perfected. Polkadot delivers unmatched security, scalability, and interoperability in a high-performance network.',
    );
    await expect(
      section.getByRole('heading', { name: 'Swift, secure, and' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: "Driven by the world's largest" }),
    ).toBeVisible();
  });

  await test.step('"chain" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'chain.png',
      snapshotConfig,
    );
  });

  await test.step('assert "scale" section is displayed properly', async () => {
    const section = page.getByTestId(
      'cards-block-3f707d0563a3b7a09da408d4da41661a',
    );

    await expect(
      section.getByRole('heading', {
        name: 'Built for scale, secure by',
      }),
    ).toBeVisible();
    await expect(section.getByText('The Polkadot Chain is your')).toHaveText(
      'The Polkadot Chain is your fast, cost-effective layer 0 foundation for connecting, securing, and relaying communications between diverse blockchain projects.',
    );
    await expect(
      section.getByRole('heading', { name: 'Pooled security' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Built-in connectivity' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Scalable performance' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Blazing-fast processing and' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Cost-efficient, flexible' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Trustless bridging' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Leading energy efficiency' }),
    ).toBeVisible();
  });

  await test.step('"scale" section screenshot', async () => {
    const section = page.getByTestId(
      'cards-block-3f707d0563a3b7a09da408d4da41661a',
    );
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'scale.png',
      snapshotConfig,
    );
  });

  await test.step('assert "launch" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'Launch your way with Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByText('Get your ideas to market fast')).toHaveText(
      'Get your ideas to market fast. Spin up your proof of concept with full access to the Polkadot ecosystem. Explore the many paths to launching a project on Polkadot.',
    );
    await expect(
      section.getByRole('heading', { name: 'Smart contracts' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Appchains' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Custom blockchains or cores' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Launch your idea' }),
    ).toBeVisible();
  });

  await test.step('"launch" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'launch.png',
      snapshotConfig,
    );
  });

  await test.step('assert "secured" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-082abb8945c5');

    await expect(
      section.getByRole('heading', {
        name: 'Secured from day one',
      }),
    ).toBeVisible();
    await expect(section.getByText('Blockchains, both PoW and PoS')).toHaveText(
      'Blockchains, both PoW and PoS, compete over resources to secure their networks, leaving them vulnerable to attacks until they develop significant community support.',
    );
    await expect(section.getByText('Polkadot takes a different')).toHaveText(
      'Polkadot takes a different approach. Blockchains pool and apply shared security across all connected chains. At the heart of Polkadot’s multi-chain framework, the Polkadot Chain makes shared security, consensus, and cross-chain interoperability possible.',
    );
    await expect(
      section.getByRole('link', { name: 'Build with confidence' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"secured" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-082abb8945c5');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'secured.png',
      snapshotConfig,
    );
  });

  await test.step('assert "interconnected" section is displayed properly', async () => {
    const section = page.getByTestId(
      'side-by-side-8715749e27f924c9c9aecd3ace015471',
    );

    await expect(
      section.getByRole('heading', {
        name: 'Deeply interconnected by',
      }),
    ).toBeVisible();
    await expect(section.getByText('Say goodbye to the era of')).toHaveText(
      'Say goodbye to the era of siloed networks. Polkadot pioneered the standard for inter-blockchain communication, uniting independent rollups via secure messaging with XCM and reliable bridges to external blockchains.',
    );
    await expect(
      section.getByRole('link', { name: 'Explore XCM' }),
    ).toBeVisible();
  });

  await test.step('"interconnected" section screenshot', async () => {
    const section = page.getByTestId(
      'side-by-side-8715749e27f924c9c9aecd3ace015471',
    );
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'interconnected.png',
      snapshotConfig,
    );
  });

  await test.step('assert "coretime" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Fine-tuned flexibility with',
      }),
    ).toBeVisible();
    await expect(section.getByText('Deploying on Polkadot will')).toHaveText(
      'Deploying on Polkadot will soon be cheaper and more flexible than ever. Stop paying for more than you need. Scale smart with Polkadot.',
    );
    await expect(
      section.getByRole('heading', { name: 'Bulk coretime' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'On-demand coretime' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Coretime on secondary markets' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Discover Coretime' }),
    ).toBeVisible();
  });

  await test.step('assert "future" section is displayed properly', async () => {
    const section = page.getByTestId('content-block');

    await expect(
      section.getByRole('heading', {
        name: 'The future starts with you',
      }),
    ).toBeVisible();
    await expect(section.getByText("Harness Polkadot's")).toHaveText(
      "Harness Polkadot's unparalleled security, scalability, and flexible computing to take your vision from idea to reality.",
    );
    await expect(
      section.getByRole('link', { name: 'Start building' }),
    ).toBeVisible();
  });
});
