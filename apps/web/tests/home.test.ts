import { expect, test } from '@playwright/test';
import { snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Homepage', async ({ page }) => {
  const ecosystemIds = [
    'c4910461f906',
    '3b6847866f76',
    '878be89f9898d0ab5e266e4fc49614c2',
    'b006a029787b991dcdea6a3338249e84',
    '1041062bfe436968c080cdeee5496b1b',
    '3479ce3e3534297a92fd5f2a5ec98880',
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
    await expect(heading).toHaveText('Built for the billions');
  });

  await test.step('assert "hero" section is displayed properly', async () => {
    const section = page.getByTestId('hero-pile');

    await expect(
      section.getByRole('heading', { name: 'Built for the billions' }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot is the most')).toHaveText(
      'Polkadot is the most scalable, secure, and resilient blockchain platform—designed for builders pushing boundaries and users who demand true ownership. Engineered for mass adoption, Polkadot brings Web3 to the world.',
    );
    await expect(
      section.getByRole('link', {
        name: 'Join the community',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Start Building', exact: true }),
    ).toBeVisible();
  });

  await test.step('"hero" section screenshot', async () => {
    const heroLandingFrame = page.getByTestId('hero-pile');
    await page.waitForTimeout(2000);
    expect(
      await heroLandingFrame.screenshot({
        animations: 'disabled',
        timeout: 12_000,
        mask: [page.getByTestId('dots-animation')],
      }),
    ).toMatchSnapshot('hero.png', snapshotConfig);
  });

  await test.step('assert "video" section is displayed properly', async () => {
    const section = page.getByTestId('video-pile-content');

    await expect(
      section.getByRole('heading', {
        name: 'Shaping the future internet together',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('video-block')).toBeVisible();
  });

  await test.step('"video" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('video-pile-content');
    await page.waitForTimeout(2000);
    expect(await section.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'video.png',
      snapshotConfig,
    );
  });

  await test.step('assert "network" section displayed properly', async () => {
    const section = page.getByTestId('network-pile');

    await expect(
      section.getByRole('heading', { name: 'Power without permission' }),
    ).toHaveText('Power without permission');
    await expect(section.getByText('Polkadot gives you')).toHaveText(
      "Polkadot gives you everything you need to build, participate, or lead in Web3. The tools are ready. The community is here. What's your next move?",
    );

    await expect(
      section.getByRole('link', {
        name: 'Get a wallet?',
      }),
    ).toHaveText(
      'Get a wallet?Learn how DOT gives you a voice—and powers the Polkadot ecosystem.',
    );

    await expect(
      section.getByRole('link', { name: 'Ready to build?' }),
    ).toHaveText(
      'Ready to build? Spin up a custom blockchain or dream dapp in minutes—on your terms.',
    );

    await expect(
      section.getByRole('link', { name: 'Want to connect?' }),
    ).toHaveText(
      "Want to connect? Join the world's largest DAO shaping the next generation of Web3.",
    );
  });

  await test.step('"network" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('network-pile-content');
    await page.waitForTimeout(2000);
    expect(await section.screenshot({ timeout: 7000 })).toMatchSnapshot(
      'network.png',
      snapshotConfig,
    );
  });

  await test.step('assert "building" section is displayed properly', async () => {
    const section = page.getByTestId('building-pile');

    await expect(
      section.getByRole('heading', {
        name: "Ready to shape what's next?",
      }),
    ).toBeVisible();
    await expect(section.getByText('Join a global')).toHaveText(
      "Join a global community of builders, creators, and visionaries pushing boundaries. If you're bold enough to build it, Polkadot is here for it.",
    );
    await expect(
      section
        .locator('[id="build\\.content"]')
        .getByRole('link', { name: 'Explore Web3' }),
    ).toBeVisible();
    await expect(
      section.getByText('Start building', { exact: true }),
    ).toBeVisible();
    await expect(
      section.getByText('Explore funding', { exact: true }),
    ).toBeVisible();
  });

  await test.step('"building" section screenshot', async () => {
    await page.waitForTimeout(2000);
    const section = page.getByTestId('building-pile');
    await page.waitForTimeout(2000);
    expect(
      await section.screenshot({
        timeout: 7000,
        animations: 'disabled',
      }),
    ).toMatchSnapshot('building.png', snapshotConfig);
  });

  await test.step('assert "newsletter" block is displayed properly', async () => {
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
    await page.waitForTimeout(2000);
    const newsletterWrapper = page.getByTestId('newsletter');
    await page.waitForTimeout(2000);
    expect(
      await newsletterWrapper.screenshot({ timeout: 7000 }),
    ).toMatchSnapshot('newsletter.png', snapshotConfig);
  });

  await test.step('assert "ecosystem" section is displayed properly', async () => {
    const section = page.getByTestId('ecosystem-pile');

    await expect(
      section.getByRole('heading', {
        name: 'Where breakthrough ideas become reality',
      }),
    ).toBeVisible();
    await expect(section.getByText('Polkadot gives builders')).toHaveText(
      'Polkadot gives builders the tools and community to turn bold ideas into real-world impact—powering everything from next-gen games to AI.',
    );
    await expect(
      section.getByRole('link', { name: 'NFL Rivals Digital' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'Hydration Omnipool DEX for',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Acurast Provide compute &' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'ChatDKG Launchpad for trusted',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Exiled Racers Racing and' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'FIFA Rivals' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Explore Dapps' }),
    ).toBeVisible();
  });

  await test.step('"ecosystem" section screenshot', async () => {
    await page.waitForTimeout(2000);
    for (const id of ecosystemIds) {
      const ecosystemImage = page.getByTestId(`ecosystem-content-${id}`);
      await page.waitForTimeout(2000);
      expect(
        await ecosystemImage.screenshot({
          animations: 'disabled',
          timeout: 7000,
        }),
      ).toMatchSnapshot(`ecosystem-${id}.png`, snapshotConfig);
    }
  });
});
