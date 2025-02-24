import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Courses', async ({ page }) => {
  await test.step('go to "Courses" page', async () => {
    await page.goto('/developers/courses');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Courses');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Learn from the best in blockchain');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Learn from the best in',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Whether you’re new to web3 or')).toHaveText(
      'Whether you’re new to web3 or want to level up as a blockchain dev, we’ve got you covered with courses, tutorials, docs, and more.',
    );
    await expect(
      section.getByRole('link', { name: 'Start learning' }),
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

  await test.step('assert "online class" section is displayed properly', async () => {
    const section = page.getByTestId('cards-sticky-block');

    await expect(
      section.getByRole('heading', {
        name: 'An online class you’ll want',
      }),
    ).toBeVisible();
    await expect(section.getByText('Dive into these free courses')).toHaveText(
      /Dive into these free courses created by the Technical Education team at Web3 Foundation. Whether you’re interested in blockchain, web3, and Polkadot, you’ll learn from expert builders, including the founders of Polkadot.\s*/,
    );
    await expect(
      section.getByRole('link', {
        name: 'Web3x Introduction to Blockchain and Web3 Master Blockchain and Web3',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', {
        name: 'Web3x Introduction to Polkadot Gain comprehensive insights into Polkadot: key',
      }),
    ).toBeVisible();
  });

  await test.step('"online class" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'online-class.png',
      snapshotConfig,
    );
  });

  await test.step('assert "academy" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-b3890d3d9888');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot Blockchain Academy',
      }),
    ).toBeVisible();
    await expect(section.getByText('The Polkadot Blockchain')).toHaveText(
      'The Polkadot Blockchain Academy is the first of its kind—a classroom-based, hands-on program that covers the the nitty gritty of blockchain technology, using Polkadot as your playground.',
    );
    await expect(section.getByText('Topics include cryptography,')).toHaveText(
      'Topics include cryptography, tokenomics, governance, game theory, peer-based and distributed network systems, API design, and more.',
    );
    await expect(
      section.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
  });

  await test.step('"academy" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-b3890d3d9888');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'academy.png',
      snapshotConfig,
    );
  });

  await test.step('assert "adventure" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-6c5d3290ea45');

    await expect(
      section.getByRole('heading', {
        name: 'Choose your adventure',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Substrate Concepts This is' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Substrate Tutorials Learn by' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Technical References Want to' }),
    ).toBeVisible();
  });

  await test.step('assert "community" section is displayed properly', async () => {
    const section = page.getByTestId('cards-small-block');

    await expect(
      section.getByRole('heading', {
        name: 'Join the largest Web3',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Twitter Join in the' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Youtube Stay up to date with' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'OpenGov Jump into the action' }),
    ).toBeVisible();
  });
});
