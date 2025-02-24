import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('DAO', async ({ page }) => {
  await test.step('go to "DAO" page', async () => {
    await page.goto('/platform/dao');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('DAO');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Discover the world’s largest DAO');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Discover the world’s largest',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Join millions of visionaries')).toHaveText(
      'Join millions of visionaries building a better future with DOT.',
    );
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

  await test.step('assert "decentralization" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Decentralization as it was',
      }),
    ).toBeVisible();
    await expect(section.getByText('Web3 is all about cutting out')).toHaveText(
      'Web3 is all about cutting out gatekeepers and putting people in control of the tech that shapes our world. Decentralization isn’t just about spreading nodes around—it’s about making sure there’s no single point of failure. With blockchain outages, hard forks, and crypto exchange bankruptcies making headlines, centralized decision-making is clearly a risk. That’s why, on Polkadot, the community of DOT token holders makes all the decisions. And there’s always room for one more.',
    );
    await expect(
      section.getByRole('heading', { name: 'Community driven' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Decentralized' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Transparent and open' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Fast-paced' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Seamless upgrades' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Join the DAO' }).first(),
    ).toBeVisible();
  });

  await test.step('"decentralization" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'decentralization.png',
      snapshotConfig,
    );
  });

  await test.step('assert "democracy" section is displayed properly', async () => {
    const section = page.getByTestId('cards-stat');

    await expect(
      section.getByRole('heading', {
        name: 'Unstoppable democracy, driven',
      }),
    ).toBeVisible();
    await expect(section.getByText('DAO members represented by')).toBeVisible();
    await expect(section.getByText('OpenGov proposals')).toBeVisible();
    await expect(
      section.getByText('DOT available in Treasury pool'),
    ).toBeVisible();
  });

  await test.step('"democracy" section screenshot', async () => {
    const section = page.getByTestId('cards-stat');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'democracy.png',
      snapshotConfig,
    );
  });

  await test.step('assert "join" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-66f97030f3ca');

    await expect(
      section.getByRole('heading', {
        name: 'Join the DAO',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot DAO uses OpenGov,')).toHaveText(
      'Polkadot DAO uses OpenGov, the pioneering decentralized governance platform that empowers the community to be in full control of the network. Since the Polkadot DAO was launched, there’s no going back—Polkadot decentralized decision-making power cannot be stopped, even by its creators.',
    );
    await expect(
      section.getByRole('link', { name: 'Open a Polkadot account and' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Propose ideas Bring your' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Join the discussion Make your' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Participate in voting Vote on' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Form alliance or delegate' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Share your passion Become a' }),
    ).toBeVisible();
  });

  await test.step('"join" section screenshot', async () => {
    const section = page.getByTestId('cards-block-66f97030f3ca');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'join.png',
      snapshotConfig,
    );
  });

  await test.step('assert "benefits" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-cce69b71f986');

    await expect(
      section.getByRole('heading', {
        name: 'Benefits of joining the',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Shape the future' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Earn rewards' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Build community' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Join the DAO' }).nth(1),
    ).toBeVisible();
  });

  await test.step('"benefits" section screenshot', async () => {
    const section = page.getByTestId('cards-block-cce69b71f986');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'benefits.png',
      snapshotConfig,
    );
  });

  await test.step('assert "treasury" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-a41c64edadfc');

    await expect(
      section.getByRole('heading', {
        name: 'Backed by a 19+ million DOT',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot’s governance system')).toHaveText(
      'Polkadot’s governance system features a robust onchain treasury that the community can use to fund projects that benefit the network. Any DOT holder can submit funding and bounty proposals, and can nominate community members for rewards.',
    );
    await expect(
      section.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('"treasury" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-a41c64edadfc');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'treasury.png',
      snapshotConfig,
    );
  });

  await test.step('assert "initiatives" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-e1516f9dc848');

    await expect(
      section.getByRole('heading', {
        name: 'Latest decentralized',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'DAO backs DeFi with 3M DOT' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Pioneering sports sponsorship' }),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await expect(
      section.getByRole('link', { name: 'New Polkadot Ledger app' }),
    ).toBeVisible();
  });

  await test.step('"initiatives" section screenshot', async () => {
    const section = page.getByTestId('cards-block-e1516f9dc848');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'initiatives.png',
      snapshotConfig,
    );
  });
});
