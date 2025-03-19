import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Developers', async ({ page }) => {
  await test.step('go to developers page', async () => {
    await page.goto('/developers');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Developers');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Build on Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('header');
    await expect(section.getByText('Deploy and scale powerful,')).toHaveText(
      'Deploy and scale powerful, scalable, and customizable rollups with seamless access to Ethereum and other ecosystems. Full freedom to build your way with predictable costs.',
    );

    await expect(
      section.getByRole('button', { name: 'Documentation' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "building" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').first();

    await expect(
      section.getByRole('heading', {
        name: 'Start building on Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByText('Get up and running quickly')).toHaveText(
      /Get up and running quickly with our vast collection of developer resources.\s*/,
    );
    await expect(
      section.getByRole('link', { name: 'TUTORIAL Build your chain Get' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'TUTORIAL Build your business' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'TUTORIAL Secure through the' }),
    ).toBeVisible();
  });

  await test.step('"building" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').first();
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'building.png',
      snapshotConfig,
    );
  });

  await test.step('assert "docs" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);

    await expect(
      section.getByRole('heading', {
        name: 'Explore the Docs',
      }),
    ).toBeVisible();

    await expect(
      section.getByRole('link', { name: 'Documentation Explore and get' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Explore the Wiki Explore the' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkadot SDK Ready to dive in' }),
    ).toBeVisible();
  });

  await test.step('"docs" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(1);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'docs.png',
      snapshotConfig,
    );
  });

  await test.step('assert "scale" section section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-52e11505c8ac');

    await expect(
      section.getByRole('heading', { name: 'Reliably cheap even at scale' }),
    ).toBeVisible();
    await expect(section.getByText('Regular stress tests are')).toHaveText(
      'Regular stress tests are performed to make sure nothing breaks when you need it most. Secure your computing power in bulk to avoid exploding fees.',
    );
    await expect(
      section.getByRole('link', { name: 'Learn More' }),
    ).toBeVisible();
  });

  await test.step('"scale" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-52e11505c8ac');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'scale.png',
      snapshotConfig,
    );
  });

  await test.step('assert "interoperable" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block').nth(2);

    await expect(
      section.getByRole('heading', {
        name: 'Interoperable',
      }),
    ).toBeVisible();
    await expect(section.getByText('Build without boundaries.')).toHaveText(
      'Build without boundaries. Polkadot allows secure, seamless integration with Ethereum and other ecosystems. Learn more about Polkadot’s trustless bridges and XCM (Polkadot’s Universal Cross-Consensus Messaging format).',
    );
    await expect(
      section.getByRole('link', { name: 'Snowbridge Polkadot-Ethereum' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Hyperbridge Connect to' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Interlay Polkadot-Bitcoin' }),
    ).toBeVisible();
  });

  await test.step('"interoperable" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(2);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'interoperable.png',
      snapshotConfig,
    );
  });

  await test.step('assert "tools" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Tools and resources to fuel',
      }),
    ).toBeVisible();
    await expect(section.getByText('From tools to funding,')).toHaveText(
      'From tools to funding, explore the essentials to bring your project to life. Start building smarter and faster on Polkadot.',
    );
    await expect(
      section.getByRole('link', { name: 'Tools and Integrations' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Fund your project' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Can’t wait' }),
    ).toBeVisible();
  });

  await test.step('"tools" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'tools.png',
      snapshotConfig,
    );
  });

  await test.step('assert "help" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-9110b7215457');

    await expect(
      section.getByRole('heading', { name: 'Need help? Let’s build' }),
    ).toBeVisible();
    await expect(section.getByText('With Polkadot’s Alpha Program')).toHaveText(
      /With Polkadot’s Alpha Program, whether you’re a new team just starting off or an established project looking to join the ecosystem, we’ll help you get started.\s*/,
    );
    await expect(
      section.getByRole('link', { name: 'Alpha Program' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Courses Explore a variety of' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Contribute The forum is a' }),
    ).toBeVisible();
  });

  await test.step('assert "cta" section is displayed properly', async () => {
    const section = page.getByTestId('cta-box');

    await expect(
      section.getByRole('heading', {
        name: 'Start today',
      }),
    ).toBeVisible();
    await expect(section.getByText('Not sure where to start?')).toHaveText(
      'Not sure where to start? Speak to an expert today by filling out the Web3 Foundation contact form.',
    );
    await expect(
      section.getByRole('link', { name: 'Contact us' }),
    ).toBeVisible();
  });

  await test.step('"cta" section screenshot', async () => {
    const section = page.getByTestId('cta-box');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'cta.png',
      snapshotConfig,
    );
  });

  await test.step('assert "newsletter" section is displayed properly', async () => {
    const section = page.getByTestId('embed-form-block');

    await expect(
      section.getByRole('heading', {
        name: 'Developer Newsletter',
      }),
    ).toBeVisible();
    await expect(section.getByText('Subscribe for your monthly')).toHaveText(
      'Subscribe for your monthly dose of developer resources, events and updates.',
    );
  });

  await test.step('"newsletter" section screenshot', async () => {
    const section = page.getByTestId('embed-form-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'newsletter.png',
      snapshotConfig,
    );
  });
});
