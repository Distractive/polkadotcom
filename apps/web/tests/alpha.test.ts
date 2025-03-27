import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Alpha Program', async ({ page }) => {
  await test.step('go to "Alpha Program" page', async () => {
    await page.goto('/alpha-program');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Alpha Program');
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'Power up with the Polkadot Alpha Program',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Power up with the Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByText('Take your project from idea')).toHaveText(
      'Take your project from idea to market with comprehensive resources and collaborative development, while seizing the opportunity to shape the future of the Polkadot ecosystem.',
    );
    await expect(
      section.getByRole('link', { name: 'Get started' }),
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

  await test.step('assert "cards" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-b644dec45b6b');

    await expect(
      section.getByRole('heading', { name: 'Collaborative building' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Gain rapid visibility' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Drive Polkadot’s evolution' }),
    ).toBeVisible();
  });

  await test.step('"cards" section screenshot', async () => {
    const section = page.getByTestId('cards-block-b644dec45b6b');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'cards.png',
      snapshotConfig,
    );
  });

  await test.step('assert "program" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'Who can join the program?',
      }),
    ).toBeVisible();
    await expect(section.getByText('Got a project that is itching')).toHaveText(
      'Got a project that is itching to go live? If your team is working on something that’s not launched yet, and you’re ready to experiment while receiving and providing feedback, the Polkadot Alpha Program is for you.',
    );
    await expect(
      section.getByRole('heading', { name: 'Parachain teams' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Infrastructure providers' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Dapp teams' }),
    ).toBeVisible();
  });

  await test.step('"program" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'program.png',
      snapshotConfig,
    );
  });

  await test.step('assert "join" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Why join the Polkadot Alpha',
      }),
    ).toBeVisible();
    await expect(section.getByText("Think of 'Alpha' as your pre-")).toHaveText(
      "Think of 'Alpha' as your pre-launch testing ground. It's about enabling your team to leverage Polkadot's ecosystem of resources to polish your project, all while shaping the future of the Polkadot with your feedback.",
    );
    await expect(
      section.getByRole('heading', { name: 'Share feedback about Polkadot' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Speaker opportunities to' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Best practices from industry' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Comprehensive development' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Networking opportunities' }),
    ).toBeVisible();
    await expect(
      section.getByRole('heading', { name: 'Regular ecosystem updates' }),
    ).toBeVisible();
  });

  await test.step('"join" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'join.png',
      snapshotConfig,
    );
  });

  await test.step('assert "accordion" section is displayed properly', async () => {
    const section = page.getByTestId('accordion');

    await expect(
      section.getByRole('heading', {
        name: 'Get started with Alpha in 5',
      }),
    ).toBeVisible();
    const text1 = section
      .getByRole('region', { name: "Open 'Share your development" })
      .locator('div');
    const text2 = section
      .getByRole('region', { name: "Open 'Dive into Polkadot" })
      .locator('div');
    const button1 = section.getByRole('button', {
      name: "Open 'Share your development",
    });
    const button2 = section.getByRole('button', {
      name: "Open 'Dive into Polkadot",
    });
    await expect(button1).toBeVisible();
    await expect(text1).toBeVisible();
    await expect(text2).toBeHidden();
    await expect(button2).toBeVisible();
    await button2.click({ timeout: 2000 });
    await expect(text2).toBeVisible();
    await expect(text1).toBeHidden();
    await expect(
      section.getByRole('button', { name: "Open 'Execute and alpha test" }),
    ).toBeVisible();
    await expect(
      section.getByRole('button', { name: "Open 'Give feedback ' content" }),
    ).toBeVisible();
    await expect(
      section.getByRole('button', { name: "Open 'Launch and repeat'" }),
    ).toBeVisible();
  });

  await test.step('"accordion" section screenshot', async () => {
    const section = page.getByTestId('accordion');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'accordion.png',
      snapshotConfig,
    );
  });

  await test.step('assert "sign up" section is displayed properly', async () => {
    const section = page.getByTestId('cta-box');

    await expect(
      section.getByRole('heading', {
        name: 'Sign up for the Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByText('Be part of a global community')).toHaveText(
      "Be part of a global community propelling innovation within the Polkadot ecosystem. Share your voice, shape the future, and take your project to new heights. If you're part of a team with a project building in the Polkadot ecosystem, we are eager to connect with you.",
    );
    await expect(
      section.getByRole('link', { name: 'Learn More' }),
    ).toBeVisible();
  });

  await test.step('"sign up" section screenshot', async () => {
    const section = page.getByTestId('cta-box');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'sign-up.png',
      snapshotConfig,
    );
  });
});
