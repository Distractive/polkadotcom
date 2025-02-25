import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('About', async ({ page }) => {
  await test.step('go to "About" page', async () => {
    await page.goto('/community/about');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('About');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('This is Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'This is Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Paving the way for the next')).toHaveText(
      'Paving the way for the next great shift of the internet',
    );
    await expect(
      section.getByRole('link', { name: 'Work with us' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "press" section is displayed properly', async () => {
    const section = page.getByTestId('cards-logo-block');

    await expect(
      section.getByRole('heading', {
        name: 'In the press',
      }),
    ).toBeVisible();

    await expect(section.getByRole('img', { name: 'Coindesk' })).toBeVisible();
    await expect(section.getByRole('img', { name: 'Fortune' })).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Cointelegraph' }),
    ).toBeVisible();
    await expect(section.getByRole('img', { name: 'Billboard' })).toBeVisible();
    await expect(section.getByRole('img', { name: 'Forbes' })).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Techcrunch' }),
    ).toBeVisible();
  });

  await test.step('"press" section screenshot', async () => {
    const section = page.getByTestId('cards-logo-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'press.png',
      snapshotConfig,
    );
  });

  await test.step('assert "mission" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-86f48bbfb7c7');

    await expect(
      section.getByRole('heading', {
        name: 'Mission',
      }),
    ).toBeVisible();
    await expect(section.getByText('Our passionate community')).toHaveText(
      'Our passionate community envisions a web where your digital identity and data are yours alone–where power is restored to its users. Together, we’re building a fully decentralized web where users are in control. It’s the digital revolution you’ve been waiting for.',
    );
    await expect(
      section.getByRole('link', { name: 'Build with Polkadot' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"mission" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-86f48bbfb7c7');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'mission.png',
      snapshotConfig,
    );
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', {
        name: 'Imagine a decentralized',
      }),
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

  await test.step('assert "founded" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-ae722d979a22');

    await expect(
      section.getByRole('heading', {
        name: 'Founded by leading blockchain',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Founder Gavin Wood Meet Dr.' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Founder Robert Habermeier' }),
    ).toBeVisible();
  });

  await test.step('"founded" section screenshot', async () => {
    const section = page.getByTestId('cards-block-ae722d979a22');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'founded.png',
      snapshotConfig,
    );
  });

  await test.step('assert "vision" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'One vision, one DAO',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot isn’t run by a')).toHaveText(
      'Polkadot isn’t run by a faceless corporation; it’s powered and supported by the largest DAO in Web3. Our community calls the shots, with no central point of control. Instead, a dedicated group of appointed members and teams help make sure everything runs smoothly. Meet some of the key players leading the change in this new digital frontier.',
    );
    await expect(
      section.getByRole('link', { name: 'Web3 Foundation Grants,' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Parity Protocol engineering' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Distractive Marketing' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'PoKe Business development' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'PolkaPort East Investor' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Velocity Labs Tools &' }),
    ).toBeVisible();
  });

  await test.step('"vision" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'vision.png',
      snapshotConfig,
    );
  });

  await test.step('assert "standards" section is displayed properly', async () => {
    const section = page.getByTestId('cards-stat');

    await expect(
      section.getByRole('heading', {
        name: 'Keeping high standards (&',
      }),
    ).toBeVisible();
    await expect(section.getByText('Nakamoto coefficient score')).toBeVisible();
    await expect(
      section.getByText('Members in the Polkadot DAO'),
    ).toBeVisible();
    await expect(section.getByText('In security backing')).toBeVisible();
    await expect(
      page
        .getByTestId('button-block')
        .getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
  });

  await test.step('"standards" section screenshot', async () => {
    const section = page.getByTestId('cards-stat');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'standards.png',
      snapshotConfig,
    );
  });

  await test.step('assert "connecting" section is displayed properly', async () => {
    const section = page.getByTestId('timeline');

    await expect(
      section.getByRole('heading', {
        name: 'Connecting the dots on',
      }),
    ).toBeVisible();
    await expect(
      section.getByText('Gavin Wood coined the term “'),
    ).toBeVisible();
    await expect(
      section.getByText('Polkadot whitepaper released'),
    ).toBeVisible();
    await expect(
      section.getByText('Web3 Foundation (W3F), a non-'),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await page.waitForTimeout(2000);
    await expect(
      section.getByText('Polkadot’s mainnet launched'),
    ).toBeVisible();
    await expect(section.getByText('First Polkadot parachains')).toBeVisible();
    await expect(
      section.getByText('OpenGov, the first ever on-'),
    ).toBeVisible();
  });

  await test.step('"connecting" section screenshot', async () => {
    const section = page.getByTestId('timeline');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'connecting.png',
      snapshotConfig,
    );
  });

  await test.step('assert "work" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-8695dc2f5823');

    await expect(
      section.getByRole('heading', {
        name: 'Come work with us',
      }),
    ).toBeVisible();
    await expect(section.getByText('Interested in working with')).toHaveText(
      'Interested in working with the teams behind Polkadot?',
    );
    await expect(
      section.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
  });

  await test.step('"work" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-8695dc2f5823');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'work.png',
      snapshotConfig,
    );
  });
});
