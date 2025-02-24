import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('SDK', async ({ page }) => {
  await test.step('go to "SDK" page', async () => {
    await page.goto('/platform/sdk');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('SDK');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Your ultimate modular playground');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Your ultimate modular playground',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Polkadot SDK offers a highly')).toHaveText(
      'Polkadot SDK offers a highly customizable modular architecture and an extensive suite of tools and libraries, enabling next-level blockchain innovation.',
    );
    await expect(
      section.getByRole('link', { name: 'Developer Docs' }),
    ).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Pink dots representing the' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "sdk" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-8be0f6313ae7');

    await expect(
      section.getByRole('heading', {
        name: 'One SDK to power them all',
      }),
    ).toBeVisible();
    await expect(section.getByText('Break free from the')).toHaveText(
      'Break free from the constraints of other frameworks. The Polkadot SDK offers a flexible, composable, and comprehensive framework for blockchain development, whether you’re creating a new blockchain or enhancing an existing one.',
    );
    await expect(section.getByText('Pick and even hot-swap')).toBeVisible();
    await expect(
      section.getByText('Enjoy rapid transaction times'),
    ).toBeVisible();
    await expect(section.getByText('Go solo or connect to the')).toBeVisible();
    await expect(section.getByText('Adapt your architecture as')).toBeVisible();
  });

  await test.step('"sdk" section screenshot', async () => {
    const section = page.getByTestId('cards-block-8be0f6313ae7');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'sdk.png',
      snapshotConfig,
    );
  });

  await test.step('assert "build" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-8b1eb2090cfe');

    await expect(
      section.getByRole('heading', {
        name: 'Built for versatility,',
      }),
    ).toBeVisible();
    await expect(section.getByText('The Polkadot SDK takes the')).toHaveText(
      'The Polkadot SDK takes the hard work out of blockchain development without the limits of other frameworks. Build specialized blockchains or use pre-built modules to add battle-tested functionality. Use only what makes sense for your project.',
    );
    await expect(
      section.getByRole('link', { name: 'Start building' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"build" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-8b1eb2090cfe');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'build.png',
      snapshotConfig,
    );
  });

  await test.step('assert "features" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'Key features of Polkadot SDK',
      }),
    ).toBeVisible();
    await expect(section.getByText('Go from zero to blockchain')).toHaveText(
      'Go from zero to blockchain before your Uber Eats arrives',
    );
    await expect(
      section.getByRole('link', { name: 'Forkless & seamless upgrades' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Highly customizable runtime' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Versatile & bespoke modules' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Robust tooling & support' }),
    ).toBeVisible();
  });

  await test.step('"features" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'features.png',
      snapshotConfig,
    );
  });

  await test.step('assert "day one" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-ac3aae8ec3fe');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot-ready from day one',
      }),
    ).toBeVisible();
    await expect(section.getByText('Connect effortlessly to the')).toHaveText(
      'Connect effortlessly to the Polkadot Chain if and when you want to gain access to its shared security mechanism, built-in cross-chain communication capabilities, and an ever-expanding universe of projects.',
    );
    await expect(
      section.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"day one" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-ac3aae8ec3fe');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'day-one.png',
      snapshotConfig,
    );
  });

  await test.step('assert "powering" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Powering millions of',
      }),
    ).toBeVisible();
    await expect(section.getByText('The Polkadot SDK makes')).toHaveText(
      'The Polkadot SDK makes building a blockchain far easier, faster, cheaper, and safer than ever before. This open-source framework gives you free access to a robust codebase developed and used by industry-leading teams building some of the biggest networks today. Projects that rely on the Polkadot SDK to power some portion of their chain:',
    );
    await expect(
      page.getByRole('link', { name: 'See more projects' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Midnight' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'BitTensor' }),
    ).toBeVisible();
    await expect(section.getByRole('heading', { name: 'Avail' })).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Aleph Zero' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'StarkNet Madara' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Energy Web' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Xx.network' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Moonbeam' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Acurast' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Tanssi' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'InvArch' }),
    ).toBeVisible();
  });

  await test.step('"powering" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'powering.png',
      snapshotConfig,
    );
  });

  await test.step('assert "no limits" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(2);

    await expect(
      section.getByRole('heading', {
        name: 'Build without limits',
      }),
    ).toBeVisible();
    await expect(section.getByText('Explore popular modules for')).toHaveText(
      'Explore popular modules for developers diving into the wild, wonderful world of the Polkadot SDK.',
    );
    await expect(
      section.getByRole('heading', { name: 'Identity' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Democracy' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Randomness' }),
    ).toBeVisible();
  });

  await test.step('"no limits" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(2);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'no-limits.png',
      snapshotConfig,
    );
  });

  await test.step('assert "resources" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(3);

    await expect(
      section.getByRole('heading', {
        name: 'Resources',
      }),
    ).toBeVisible();
    await expect(section.getByText('Explore our developer')).toHaveText(
      'Explore our developer resources for comprehensive support and tools. Explore our developer resources for comprehensive support and tools.',
    );
    await expect(
      section.getByRole('link', { name: 'Documentation' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Community forum' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Code repositories' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Tool index' }),
    ).toBeVisible();
  });

  await test.step('"resources" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(3);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'resources.png',
      snapshotConfig,
    );
  });

  await test.step('assert "start building" section is displayed properly', async () => {
    const section = page.getByTestId('content-block');

    await expect(
      section.getByRole('heading', {
        name: 'Start building',
      }),
    ).toBeVisible();
    await expect(section.getByText('Dive into blockchain')).toHaveText(
      'Dive into blockchain development with Polkadot SDK. Customize your projects with modular components, robust tools, and comprehensive support to unleash your creativity.',
    );
    await expect(
      section.getByRole('link', { name: 'Start building' }),
    ).toBeVisible();
  });

  await test.step('"start building" section screenshot', async () => {
    const section = page.getByTestId('content-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'start-building.png',
      snapshotConfig,
    );
  });
});
