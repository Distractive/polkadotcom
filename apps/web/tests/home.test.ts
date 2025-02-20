import { expect, test } from '@playwright/test';
import { snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Homepage', async ({ page }) => {
  const ecosystemIds = [
    '3b6847866f76',
    '878be89f9898d0ab5e266e4fc49614c2',
    'b006a029787b991dcdea6a3338249e84',
    '1041062bfe436968c080cdeee5496b1b',
    '3479ce3e3534297a92fd5f2a5ec98880',
    'ed5a6361d98e64e2029dae1052a67228',
  ];

  await test.step('go to homepage', async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle(
      'Polkadot | The secure, powerful core of Web3',
    );
    const heading = page.locator('h1');
    await expect(heading).toHaveText("Defy what's possible");
  });

  await test.step("assert 'hero' section is displayed properly", async () => {
    const heroSection = page.getByTestId('hero-pile');

    await expect(
      heroSection.getByRole('heading', { name: "Defy what's possible" }),
    ).toBeVisible();
    await expect(
      heroSection.getByText("Polkadot unites the world's"),
    ).toHaveText(
      "Polkadot unites the world's innovators and changemakers, building and using the most transformative apps and blockchains.",
    );
    await expect(
      heroSection.getByRole('link', {
        name: 'Join the community',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      heroSection.getByRole('link', { name: 'Start Building', exact: true }),
    ).toBeVisible();
  });

  await test.step('hero section screenshot', async () => {
    const heroLandingFrame = page.getByTestId('hero-pile');
    expect(
      await heroLandingFrame.screenshot({
        animations: 'disabled',
        timeout: 12_000,
        mask: [page.getByTestId('dots-animation')],
      }),
    ).toMatchSnapshot('hero.png', snapshotConfig);
  });

  await test.step("assert 'video' section is displayed properly", async () => {
    const videoSection = page.getByTestId('video-pile-content');

    await expect(
      videoSection.getByRole('heading', { name: 'A future led by you' }),
    ).toBeVisible();
    await expect(videoSection.getByTestId('video-block')).toBeVisible();
  });

  await test.step('video section screenshot', async () => {
    await page.waitForTimeout(3000);
    const videoSection = page.getByTestId('video-pile-content');
    expect(await videoSection.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'video.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'network' section displayed properly", async () => {
    const networkSection = page.getByTestId('network-pile');

    await expect(
      networkSection.getByRole('heading', { name: 'A network governed by a' }),
    ).toHaveText('A network governed by a rebelliously innovative community');
    await expect(
      networkSection.getByText('Polkadot is a blockchain'),
    ).toHaveText(
      'Polkadot is a blockchain network of networks designed to challenge our assumptions, directed and governed by those who hold the DOT token. By holding DOT, you are part of the largest and most decentralized decision-making group in the world.',
    );
    await expect(
      networkSection.getByRole('link', {
        name: 'DOT token basics What’s in a',
      }),
    ).toHaveText(
      'DOT token basicsWhat’s in a DOT? Dive into the utility token that powers the Polkadot ecosystem.',
    );
    await expect(
      networkSection.getByRole('link', { name: 'Build on Polkadot Spin up a' }),
    ).toHaveText(
      'Build on PolkadotSpin up a custom blockchain in minutes, or build the app of your dreams.',
    );
    await expect(
      networkSection.getByRole('link', { name: 'Join the community Join a' }),
    ).toHaveText(
      'Join the communityJoin a chat, create content, or help champion Polkadot.',
    );
  });

  await test.step('network section screenshot', async () => {
    await page.waitForTimeout(3000);
    const networkSection = page.getByTestId('network-pile-content');
    expect(await networkSection.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'network.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'stats' section is displayed properly", async () => {
    const statsSection = page.getByTestId('stats-pile');

    await expect(
      statsSection.getByRole('heading', { name: 'Polkadot’s unstoppable' }),
    ).toHaveText('Polkadot’s unstoppable momentum');
    await expect(statsSection.getByText('1.43 millionDAO members')).toHaveText(
      '1.43 millionDAO members represented by total onchain wallets',
    );
    await expect(
      statsSection.getByText('$5 billionstaked economic'),
    ).toHaveText('$5 billionstaked economic security');
    await expect(
      statsSection.getByText('448,293average MAA across'),
    ).toHaveText(
      '448,293average MAA across Polkadot ecosystem in 2024 to date',
    );
    await expect(
      statsSection.getByText('1390+ referendacreated by the'),
    ).toHaveText('1390+ referendacreated by the DAO since 2023');
    await expect(
      statsSection.getByText('+ projectsin the Polkadot ecosystem'),
    ).toHaveText('600+ projectsin the Polkadot ecosystem');
  });

  await test.step('stats section screenshot', async () => {
    await page.waitForTimeout(3000);
    const statsSection = page.getByTestId('stats-pile');
    expect(await statsSection.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'stats.png',
      snapshotConfig,
    );
  });

  await test.step("assert 'building' section is displayed properly", async () => {
    const ecosystemSection = page.getByTestId('building-pile');

    await expect(
      ecosystemSection.getByRole('heading', {
        name: 'What are you waiting for?',
      }),
    ).toBeVisible();
    await expect(ecosystemSection.getByText('We’re the most open,')).toHaveText(
      'We’re the most open, collaborative, passionate group of free thinkers, boundary pushers, creators, builders, innovators, and misfits. Share your ideas, projects, and vision for an open web. We can’t wait to meet you.',
    );
    await expect(
      ecosystemSection
        .locator('[id="build\\.content"]')
        .getByRole('link', { name: 'Get started' }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByText('Start building', { exact: true }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByText('Explore funding', { exact: true }),
    ).toBeVisible();
  });

  await test.step('building section screenshot', async () => {
    await page.waitForTimeout(5000);
    const ecosystemSection = page.getByTestId('building-pile');
    expect(
      await ecosystemSection.screenshot({
        timeout: 7000,
        animations: 'disabled',
      }),
    ).toMatchSnapshot('building.png', snapshotConfig);
  });

  await test.step("assert 'connected' section is displayed properly", async () => {
    const connectedSection = page.getByTestId('connected-pile');

    await expect(
      connectedSection.getByRole('heading', { name: 'Stay connected' }),
    ).toBeVisible();
    await expect(page.getByText('The latest news, notes, and')).toHaveText(
      'The latest news, notes, and notions from across the Polkadot ecosystem',
    );
    await expect(
      connectedSection.getByRole('link', {
        name: 'technology Polkadot celebrates launch of Agile Coretime The Polkadot community',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', { name: 'Programs What is a crypto' }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'network insights Polkadot',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'ecosystem Uplifting new',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'COMMUNITY Polkadot is the',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'technology Polkadot',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'Video The Gray Paper interview',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'Programs What is a crypto',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'GRANTS & FUNDING The ultimate',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'AI Unleashing the Potential',
      }),
    ).toBeVisible();
    await connectedSection.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(1000);
    await expect(
      connectedSection.getByRole('link', {
        name: 'Defi Polkadot DAO allocates',
      }),
    ).toBeVisible();
  });

  await test.step("assert 'newsletter' block is displayed properly", async () => {
    const newsletterWrapper = page.getByTestId('newsletter');

    await expect(
      newsletterWrapper.getByRole('heading', {
        name: 'Polkadot’s latest news,',
      }),
    ).toBeVisible();
    await expect(
      newsletterWrapper.getByText('Get your monthly fix of'),
    ).toBeVisible();
    await expect(
      newsletterWrapper.getByRole('button', { name: 'Subscribe' }),
    ).toBeVisible();
  });

  await test.step('newsletter section screenshot', async () => {
    await page.waitForTimeout(3000);
    const newsletterWrapper = page.getByTestId('newsletter');
    expect(
      await newsletterWrapper.screenshot({ timeout: 7000 }),
    ).toMatchSnapshot('newsletter.png', snapshotConfig);
  });

  await test.step("assert 'ecosystem' section is displayed properly", async () => {
    const ecosystemSection = page.getByTestId('ecosystem-pile');

    await expect(
      ecosystemSection.getByRole('heading', {
        name: 'Home to the bold and visionary',
      }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByText('Polkadot combines unbeatable'),
    ).toHaveText(
      'Polkadot combines unbeatable technology and a strong community to bring inspiring projects to life.',
    );
    await expect(
      ecosystemSection.getByRole('link', { name: 'NFL Rivals Digital' }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByRole('link', {
        name: 'Hydration Omnipool DEX for',
      }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByRole('link', { name: 'Acurast Provide compute &' }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByRole('link', {
        name: 'ChatDKG Launchpad for trusted',
      }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByRole('link', { name: 'Exiled Racers Racing and' }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByRole('link', { name: 'Energy Web X Enterprise' }),
    ).toBeVisible();
    await expect(
      ecosystemSection.getByRole('link', { name: 'Explore Dapps' }),
    ).toBeVisible();
  });

  await test.step('ecosystem section screenshot', async () => {
    await page.waitForTimeout(2500);
    for (const id of ecosystemIds) {
      const ecosystemImage = page.getByTestId(`ecosystem-content-${id}`);
      expect(
        await ecosystemImage.screenshot({
          animations: 'disabled',
          timeout: 7000,
        }),
      ).toMatchSnapshot(`ecosystem-${id}.png`, snapshotConfig);
    }
  });
});
