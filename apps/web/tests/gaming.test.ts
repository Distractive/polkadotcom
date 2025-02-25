import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Gaming', async ({ page }) => {
  await test.step('go to "Gaming" page', async () => {
    await page.goto('/use-cases/gaming');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Gaming');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Level-up with GameFi on Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Level-up with GameFi on',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Polkadot supercharges')).toHaveText(
      "Polkadot supercharges blockchain-based experiences with tools for immersive, player-driven economies and true digital asset ownership. From AAA studios to industry disruptors, Polkadot's flexible, scalable tech stack unlocks the full potential of decentralized gaming. Game on.",
    );
    await expect(
      section.getByRole('link', { name: 'get funding' }),
    ).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Gaming controller on a pink' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "future" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-c6c8b3b61710');

    await expect(
      section.getByRole('heading', {
        name: 'The future of gaming is your',
      }),
    ).toBeVisible();
    await expect(section.getByText('Optimize your existing')).toHaveText(
      'Optimize your existing blockchain game or create a new one with Polkadot’s future-proof scalable infrastructure, enabling new immersive opportunities for players and game developers alike.',
    );
    await expect(
      section.getByRole('heading', { name: 'Join the play-to-earn' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Unlock true digital ownership' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Reward the players who matter' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Open worlds, open economies' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Hyper-charge engagement' }),
    ).toBeVisible();
  });

  await test.step('assert "gaming-platform" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-121e37842d12');

    await expect(
      section.getByRole('heading', {
        name: 'The ultimate Web3 gaming',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot is more than a')).toHaveText(
      "Polkadot is more than a blockchain—it’s the gateway to building immersive virtual worlds. Whether crafting MMORPGs or collectible card games, Polkadot’s scalable infrastructure empowers developers to create resource-intensive multiplayer experiences with fast transactions, low fees, and seamless interoperability. Leverage NFTs for truly ownable in-game assets, virtual land, and frictionless trading across games and marketplaces. From play-to-earn models to large-scale esports tournaments, Polkadot's powerful tech stack sets the stage for the next generation of web3 game development.",
    );
    await expect(
      section.getByRole('img', { name: 'Web3 gaming controller with' }),
    ).toBeVisible();
  });

  await test.step('"gaming-platform" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-121e37842d12');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'gaming-platform.png',
      snapshotConfig,
    );
  });

  await test.step('assert "infrastructure" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Reliable infrastructure for',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot delivers the')).toHaveText(
      'Polkadot delivers the flexibility, customization, and rock-solid stability gaming projects need to craft fully immersive, player-first experiences that redefine engagement and ownership.',
    );
    await expect(
      section.getByRole('heading', { name: 'Faster, hyper-smooth gameplay' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Connected worlds' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'User-driven by design' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Built-in security' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Seamless scaling for high' }),
    ).toBeVisible();
  });

  await test.step('"infrastructure" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'infrastructure.png',
      snapshotConfig,
    );
  });

  await test.step('assert "reimagined" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-63f601cae0dd');

    await expect(
      section.getByRole('heading', {
        name: 'Gaming reimagined, powered by',
      }),
    ).toBeVisible();
    await expect(section.getByText('From play-to-earn ecosystems')).toHaveText(
      'From play-to-earn ecosystems to dynamic cross-game economies, explore how Polkadot powers innovative Web3 gaming projects that redefine player engagement and digital ownership.',
    );
    await expect(
      section.getByRole('link', { name: 'Mythical Games revolutionizes' }),
    ).toBeVisible();
  });

  await test.step('"reimagined" section screenshot', async () => {
    const section = page.getByTestId('cards-block-63f601cae0dd');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'reimagined.png',
      snapshotConfig,
    );
  });

  await test.step('assert "quote" section is displayed properly', async () => {
    const section = page.getByTestId('quote-block');

    await expect(
      section.getByRole('heading', {
        name: "“Polkadot's commitment to",
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

  await test.step('assert "explore" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-168f74effb8b');

    await expect(
      section.getByRole('heading', {
        name: 'Explore top blockchain games',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot powers diverse Web3')).toHaveText(
      'Polkadot powers diverse Web3 games that showcase the potential of play-to-earn mechanics, true asset ownership, and dynamic cross-game economies.',
    );
    await expect(
      section.getByRole('link', { name: 'NFL Rivals Polkadot and' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Evrloot Polkadot brings dark' }),
    ).toBeVisible();
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await section
      .getByRole('button', { name: 'Next slide' })
      .click({ timeout: 2000 });
    await expect(
      section.getByRole('link', { name: 'Exiled Racers With Polkadot’s' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Age of Chronos Age of Chronos' }),
    ).toBeVisible();
  });

  await test.step('assert "how-to" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-d9741ecbaecf');

    await expect(
      section.getByRole('heading', {
        name: 'How play-to-earn (P2E) is',
      }),
    ).toBeVisible();
    await expect(section.getByText('Play-to-earn games are')).toHaveText(
      'Play-to-earn games are transforming mobile sports gaming by allowing players to earn real-world value through in-game assets like NFTs. Learn how Polkadot creates new opportunities for digital asset ownership and cross-chain gameplay.',
    );
    await expect(
      section.getByRole('link', { name: 'Read more' }),
    ).toBeVisible();
    await expect(section.locator('img')).toBeVisible();
  });

  await test.step('assert "jobs" section is displayed properly', async () => {
    const section = page.getByTestId(
      'side-by-side-41eb253cbfbb975807389f83febc729e',
    );

    await expect(
      section.getByRole('heading', {
        name: 'Web3 jobs: level-up your',
      }),
    ).toBeVisible();
    await expect(section.getByText('Ready to shape the future of')).toHaveText(
      'Ready to shape the future of gaming? Polkadot’s growing ecosystem offers opportunities for developers, designers, and strategists to build groundbreaking games that redefine ownership and engagement. The future of gaming starts here.',
    );
    await expect(
      section.getByRole('link', { name: 'Explore jobs' }),
    ).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Person plays Web3 game with' }),
    ).toBeVisible();
  });

  await test.step('"jobs" section screenshot', async () => {
    const section = page.getByTestId(
      'side-by-side-41eb253cbfbb975807389f83febc729e',
    );
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'jobs.png',
      snapshotConfig,
    );
  });

  await test.step('assert "faqs" section is displayed properly', async () => {
    const section = page.getByTestId('faqs');

    await expect(
      section.getByRole('heading', {
        name: 'FAQ about Web3 gaming',
      }),
    ).toBeVisible();
  });
});
