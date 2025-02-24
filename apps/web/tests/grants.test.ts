import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Grants', async ({ page }) => {
  await test.step('go to "Grants" page', async () => {
    await page.goto('/developers/grants');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Grants & Funding');
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'Empowering the builders and dreamers in Web3',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Empowering the builders and',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Polkadot offers extensive')).toHaveText(
      'Polkadot offers extensive funding opportunities for the visionaries ready to build the internet of tomorrow.',
    );
    await expect(section.getByRole('link', { name: 'Discover' })).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Two people shaking hands' }),
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

  await test.step('assert "funding" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-c5915568a2b0');

    await expect(
      section.getByRole('heading', {
        name: 'Decentralized, community-',
      }),
    ).toBeVisible();
    await expect(section.getByText('Discover the ways community')).toHaveText(
      /Discover the ways community members can access funding for Polkadot projects. From on-chain treasury and governance to grants across the Polkadot ecosystem. If you have an idea, we have the resources to empower you.\s*/,
    );
    await expect(
      section.getByRole('link', { name: "Treasury Polkadot's onchain" }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'OpenGov With Polkadot OpenGov' }),
    ).toBeVisible();
  });

  await test.step('"funding" section screenshot', async () => {
    const section = page.getByTestId('cards-block-c5915568a2b0');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'funding.png',
      snapshotConfig,
    );
  });

  await test.step('assert "grants" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Developer grants in the',
      }),
    ).toBeVisible();
    await expect(section.getByText('Many projects offer their own')).toHaveText(
      'Many projects offer their own developer and team grants. Check them out and find the right fit.',
    );
    await expect(
      section.getByRole('link', { name: 'Acala Grants Program' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Aleph Zero Funding Program' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Avail Uncharted Grants' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Ava Protocol Developer Grants' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Darwinia Grants Program' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Hydration Grants and Bounties' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'ink!ubator' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Moonbeam Grants Program' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Moonbeam Ecosystem Fund' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'peaq Ecosystem Grant Program' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Pendulum / Amplitude Grant' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polimec On-chain funding' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkadot Pioneers Prize' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'SubQuery Grants Programme' }),
    ).toBeVisible();
  });

  await test.step('"grants" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'grants.png',
      snapshotConfig,
    );
  });

  await test.step('assert "opportunities" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-4fbbe3d50299');

    await expect(
      section.getByRole('heading', {
        name: 'Opportunities from the Web3',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Grants The Web3 Foundation is' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Decentralized JAM Prize With' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Decentralized Futures This' }),
    ).toBeVisible();
  });

  await test.step('"opportunities" section screenshot', async () => {
    const section = page.getByTestId('cards-block-4fbbe3d50299');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'opportunities.png',
      snapshotConfig,
    );
  });

  await test.step('assert "recent" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-534d25d7af6f');

    await expect(
      section.getByRole('heading', {
        name: 'Recent funding highlights',
      }),
    ).toBeVisible();
    await expect(section.getByText('Get inspired by reading up on')).toHaveText(
      'Get inspired by reading up on recent funding announcements or project recipients taking the Polkadot ecosystem by storm.',
    );
    await expect(
      section.getByRole('link', { name: 'Introducing DOT Play Dot Play' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Scytale Digital Polkadot' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Introducing PoKe PoKe awarded' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Empowering decentralization' }),
    ).toBeVisible();
  });

  await test.step('"recent" section screenshot', async () => {
    const section = page.getByTestId('cards-block-534d25d7af6f');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'recent.png',
      snapshotConfig,
    );
  });

  await test.step('assert "get-started" section is displayed properly', async () => {
    const section = page.getByTestId('content-block');

    await expect(
      section.getByRole('heading', {
        name: 'Ready to fund your dream',
      }),
    ).toBeVisible();
    await expect(section.getByText('Join thousands of developers')).toHaveText(
      'Join thousands of developers who are building their projects with the support of the largest DAO in web3.',
    );
    await expect(
      section.getByRole('link', { name: 'Get started' }),
    ).toBeVisible();
  });

  await test.step('"get-started" section screenshot', async () => {
    const section = page.getByTestId('content-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'get-started.png',
      snapshotConfig,
    );
  });
});
