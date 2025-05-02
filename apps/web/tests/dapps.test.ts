import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Dapps', async ({ page }) => {
  await test.step('go to "dapps" page', async () => {
    await page.goto('/get-started/dapps');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Dapps');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Polkadot Dapps');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot Dapps',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('Your portal to the evolving')).toHaveText(
      'Your portal to the evolving Polkadot ecosystem.',
    );
    await expect(
      section.getByRole('link', { name: 'Submit your projec' }),
    ).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'A person scrolling on their' }),
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

  await test.step('assert "featured" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-efb18d9d56b7');

    await expect(
      section.getByRole('heading', {
        name: 'Featured',
      }),
    ).toBeVisible();
    const all = section.getByRole('button', { name: 'Filter by All' });
    const bridges = section.getByRole('button', { name: 'Bridges' });
    const defi = section.getByRole('button', { name: 'DeFi' });
    const gaming = section.getByRole('button', { name: 'Gaming' });
    const marketplaces = section.getByRole('button', { name: 'Marketplaces' });
    const social = section.getByRole('button', { name: 'Social' });
    const tokenization = section.getByRole('button', { name: 'Tokenization' });
    const other = section.getByRole('button', { name: 'Other' });
    const wallets = section.getByRole('button', { name: 'Wallets' });

    await expect(all).toBeVisible();
    await expect(bridges).toBeVisible();
    await expect(defi).toBeVisible();
    await expect(gaming).toBeVisible();
    await expect(marketplaces).toBeVisible();
    await expect(social).toBeVisible();
    await expect(tokenization).toBeVisible();
    await expect(other).toBeVisible();
    await expect(wallets).toBeVisible();

    const hydration = section.getByRole('link', {
      name: 'DeFi Hydration DEX for low-',
    });
    const rivals = section.getByRole('link', {
      name: 'Gaming NFL Rivals Digital',
    });
    const hyperbridge = section.getByRole('link', {
      name: 'Bridges Hyperbridge',
    });
    const bifrost = section.getByRole('link', {
      name: 'DeFi Bifrost Non-custodial',
    });
    const talisman = section.getByRole('link', {
      name: 'Wallets Talisman Ultra-secure',
    });
    const evrloot = section.getByRole('link', {
      name: 'Gaming Evrloot Dark fantasy',
    });
    const nova = section.getByRole('link', {
      name: 'Wallets Nova Wallet Leading',
    });
    const polimec = section.getByRole('link', {
      name: 'DeFi Polimec Decentralized',
    });
    const stella = section.getByRole('link', {
      name: 'DeFi StellaSwap Hybrid DEX',
    });
    const wormhole = section.getByRole('link', {
      name: 'Bridges Wormhole Portal',
    });
    const acala = section.getByRole('link', {
      name: 'DeFi Acala DeFi network and',
    });
    const arth = section.getByRole('link', {
      name: 'DeFi ArthSwap Swaps, staking',
    });
    const beam = section.getByRole('link', {
      name: 'DeFi BeamEx Perpetuals',
    });
    const colb = section.getByRole('link', {
      name: 'DeFi Colb Finance Liquid RWA',
    });
    const exiled = section.getByRole('link', {
      name: 'Gaming Exiled Racers Racing',
    });
    const gamma = section.getByRole('link', {
      name: 'DeFi Gamma Active liquidity',
    });
    const houdini = section.getByRole('link', {
      name: 'DeFi HoudiniSwap Send, swap',
    });
    const interlay = section.getByRole('link', {
      name: 'DeFi Interlay Trustless',
    });
    const moonwell = section.getByRole('link', {
      name: 'DeFi Moonwell Open lending',
    });
    const oku = section.getByRole('link', {
      name: "DeFi Oku (Uniswap) DeFi's",
    });
    const zenlink = section.getByRole('link', {
      name: 'DeFi Zenlink DEX composable',
    });
    const chronos = section.getByRole('link', {
      name: 'Gaming Age of Chronos',
    });
    const avatars = section.getByRole('link', {
      name: 'Gaming Awesome Ajuna Avatars',
    });
    const greatEscape = section.getByRole('link', {
      name: 'Gaming The Great Escape Hyper',
    });
    const artZero = section.getByRole('link', {
      name: 'Marketplaces ArtZero NFT',
    });
    const beatport = section.getByRole('link', {
      name: 'Marketplaces Beatport.io',
    });
    const destore = section.getByRole('link', {
      name: 'Marketplaces DeStore Craft,',
    });
    const kodaDot = section.getByRole('link', {
      name: 'Marketplaces KodaDot',
    });
    const moonbeans = section.getByRole('link', {
      name: 'Marketplaces Moonbeans Multi-',
    });
    const rarible = section.getByRole('link', {
      name: 'Marketplaces Rarible',
    });
    const singular = section.getByRole('link', {
      name: 'Marketplaces Singular Modular',
    });
    const uniqueNetwork = section.getByRole('link', {
      name: 'Marketplaces Unique Network',
    });
    const agentWars = section.getByRole('link', {
      name: 'Other AI Agent Wars Build',
    });
    const chatDkg = section.getByRole('link', {
      name: 'Other AI ChatDKG Knowledge',
    });
    const acurast = section.getByRole('link', {
      name: 'Other DePin Acurast Provide',
    });
    const mapMetrics = section.getByRole('link', {
      name: 'Other DePin MapMetrics Earn',
    });
    const silencio = section.getByRole('link', {
      name: 'Other DePin Silencio',
    });
    const airlyft = section.getByRole('link', {
      name: 'Social Airlyft Contribute to',
    });
    const diode = section.getByRole('link', {
      name: 'Social Diode Web3',
    });
    const galaxe = section.getByRole('link', {
      name: 'Social Galxe Onboarding the',
    });
    const grillChat = section.getByRole('link', {
      name: 'Social Grill Chat Free,',
    });
    const heal3 = section.getByRole('link', {
      name: 'Social Heal3 Gamefied fitness',
    });
    const kilt = section.getByRole('link', {
      name: 'Other KILT Digital identities',
    });
    const livetree = section.getByRole('link', {
      name: 'Social Livetree Social videos',
    });
    const mewe = section.getByRole('link', {
      name: 'Social MeWe Decentralized',
    });
    const moonFit = section.getByRole('link', {
      name: 'Social MoonFit Web3 & NFT',
    });
    const teddy = section.getByRole('link', {
      name: 'Social Teddy DAO Donations',
    });
    const zeitgeist = section.getByRole('link', {
      name: 'Social Zeitgeist Predicting',
    });
    const apillon = section.getByRole('link', {
      name: 'Tokenization Apillon Launch',
    });
    const carbify = section.getByRole('link', {
      name: 'Tokenization Carbify UN-',
    });
    const centrifuge = section.getByRole('link', {
      name: 'Tokenization Centrifuge',
    });
    const ewx = section.getByRole('link', {
      name: 'Tokenization EWX Marketplace',
    });
    const smartflow = section.getByRole('link', {
      name: 'Tokenization Smartflow Deploy',
    });
    const ledger = section.getByRole('link', {
      name: 'Wallets Ledger Leading',
    });
    const polkasafe = section.getByRole('link', {
      name: 'Wallets Polkasafe Ultimate',
    });
    const subwallet = section.getByRole('link', {
      name: 'Wallets SubWallet Highly',
    });
    const squidRouter = section.getByRole('link', {
      name: 'Bridges Squid Router Axelar-',
    });
    const algem = section.getByRole('link', {
      name: 'DeFi Algem Liquid assets on',
    });
    const primeProtocol = section.getByRole('link', {
      name: 'DeFi Prime Protocol Cross-',
    });
    const bagpipes = section.getByRole('link', {
      name: 'Other Bagpipes Web3 no-code',
    });
    const polkaswap = section.getByRole('link', {
      name: 'DeFi Polkaswap AMM DEX with',
    });
    const flappyWud = section.getByRole('link', {
      name: 'Gaming FlappyWUD Web3 game',
    });
    const pinkDrop = section.getByRole('link', {
      name: 'Gaming Pinkdrop Pinkdrop is',
    });
    const fearless = section.getByRole('link', {
      name: 'Wallets Fearless Wallet Multi',
    });
    const mimir = section.getByRole('link', {
      name: 'Wallets Mimir Multi-chain',
    });
    const polkadentity = section.getByRole('link', {
      name: 'Social PolkaIdentity',
    });

    const showMore = page.getByRole('button', { name: 'Show More' });
    // @Note: show all
    async function clickShowMoreTimes(times: number) {
      for (let i = 0; i < times; i++) {
        const button = page.getByRole('button', { name: 'Show More' });
        await button.scrollIntoViewIfNeeded();
        await button.waitFor({ state: 'visible' });
        await button.click({ timeout: 3000 });
      }
    }

    await clickShowMoreTimes(8);
    expect(hydration).toBeVisible();
    expect(rivals).toBeVisible();
    expect(hyperbridge).toBeVisible();
    expect(bifrost).toBeVisible();
    expect(talisman).toBeVisible();
    expect(evrloot).toBeVisible();
    expect(nova).toBeVisible();
    expect(polimec).toBeVisible();
    expect(stella).toBeVisible();
    expect(wormhole).toBeVisible();
    expect(acala).toBeVisible();
    expect(arth).toBeVisible();
    expect(beam).toBeVisible();
    expect(colb).toBeVisible();
    expect(exiled).toBeVisible();
    expect(gamma).toBeVisible();
    expect(houdini).toBeVisible();
    expect(interlay).toBeVisible();
    expect(moonwell).toBeVisible();
    expect(oku).toBeVisible();
    expect(zenlink).toBeVisible();
    expect(chronos).toBeVisible();
    expect(avatars).toBeVisible();
    expect(greatEscape).toBeVisible();
    expect(artZero).toBeVisible();
    expect(beatport).toBeVisible();
    expect(destore).toBeVisible();
    expect(kodaDot).toBeVisible();
    expect(moonbeans).toBeVisible();
    expect(rarible).toBeVisible();
    expect(singular).toBeVisible();
    expect(uniqueNetwork).toBeVisible();
    expect(agentWars).toBeVisible();
    expect(chatDkg).toBeVisible();
    expect(acurast).toBeVisible();
    expect(mapMetrics).toBeVisible();
    expect(silencio).toBeVisible();
    expect(airlyft).toBeVisible();
    expect(diode).toBeVisible();
    expect(galaxe).toBeVisible();
    expect(grillChat).toBeVisible();
    expect(heal3).toBeVisible();
    expect(kilt).toBeVisible();
    expect(livetree).toBeVisible();
    expect(mewe).toBeVisible();
    expect(moonFit).toBeVisible();
    expect(teddy).toBeVisible();
    expect(zeitgeist).toBeVisible();
    expect(apillon).toBeVisible();
    expect(carbify).toBeVisible();
    expect(centrifuge).toBeVisible();
    expect(ewx).toBeVisible();
    expect(smartflow).toBeVisible();
    expect(ledger).toBeVisible();
    expect(polkasafe).toBeVisible();
    expect(subwallet).toBeVisible();
    expect(squidRouter).toBeVisible();
    expect(algem).toBeVisible();
    expect(primeProtocol).toBeVisible();
    expect(bagpipes).toBeVisible();
    expect(polkaswap).toBeVisible();
    expect(flappyWud).toBeVisible();
    expect(pinkDrop).toBeVisible();
    expect(fearless).toBeVisible();
    expect(mimir).toBeVisible();
    expect(polkadentity).toBeVisible();

    await bridges.click({ timeout: 2000 });

    expect(hydration).toBeHidden();
    expect(rivals).toBeHidden();
    expect(hyperbridge).toBeVisible();
    expect(bifrost).toBeHidden();
    expect(talisman).toBeHidden();
    expect(evrloot).toBeHidden();
    expect(nova).toBeHidden();
    expect(polimec).toBeHidden();
    expect(stella).toBeHidden();
    expect(wormhole).toBeVisible();
    expect(acala).toBeHidden();
    expect(arth).toBeHidden();
    expect(beam).toBeHidden();
    expect(colb).toBeHidden();
    expect(exiled).toBeHidden();
    expect(gamma).toBeHidden();
    expect(houdini).toBeHidden();
    expect(interlay).toBeHidden();
    expect(moonwell).toBeHidden();
    expect(oku).toBeHidden();
    expect(zenlink).toBeHidden();
    expect(chronos).toBeHidden();
    expect(avatars).toBeHidden();
    expect(greatEscape).toBeHidden();
    expect(artZero).toBeHidden();
    expect(beatport).toBeHidden();
    expect(destore).toBeHidden();
    expect(kodaDot).toBeHidden();
    expect(moonbeans).toBeHidden();
    expect(rarible).toBeHidden();
    expect(singular).toBeHidden();
    expect(uniqueNetwork).toBeHidden();
    expect(agentWars).toBeHidden();
    expect(chatDkg).toBeHidden();
    expect(acurast).toBeHidden();
    expect(mapMetrics).toBeHidden();
    expect(silencio).toBeHidden();
    expect(airlyft).toBeHidden();
    expect(diode).toBeHidden();
    expect(galaxe).toBeHidden();
    expect(grillChat).toBeHidden();
    expect(heal3).toBeHidden();
    expect(kilt).toBeHidden();
    expect(livetree).toBeHidden();
    expect(mewe).toBeHidden();
    expect(moonFit).toBeHidden();
    expect(teddy).toBeHidden();
    expect(zeitgeist).toBeHidden();
    expect(apillon).toBeHidden();
    expect(carbify).toBeHidden();
    expect(centrifuge).toBeHidden();
    expect(ewx).toBeHidden();
    expect(smartflow).toBeHidden();
    expect(ledger).toBeHidden();
    expect(polkasafe).toBeHidden();
    expect(subwallet).toBeHidden();
    expect(squidRouter).toBeVisible();
    expect(algem).toBeHidden();
    expect(primeProtocol).toBeHidden();
    expect(bagpipes).toBeHidden();
    expect(polkaswap).toBeHidden();
    expect(flappyWud).toBeHidden();
    expect(pinkDrop).toBeHidden();
    expect(fearless).toBeHidden();
    expect(mimir).toBeHidden();
    expect(polkadentity).toBeHidden();

    await defi.click({ timeout: 2000 });

    expect(hydration).toBeVisible();
    expect(rivals).toBeHidden();
    expect(hyperbridge).toBeHidden();
    expect(bifrost).toBeVisible();
    expect(talisman).toBeHidden();
    expect(evrloot).toBeHidden();
    expect(nova).toBeHidden();
    expect(polimec).toBeVisible();
    expect(stella).toBeVisible();
    expect(wormhole).toBeHidden();
    expect(acala).toBeVisible();
    expect(arth).toBeVisible();
    expect(beam).toBeVisible();
    expect(colb).toBeVisible();
    expect(exiled).toBeHidden();
    expect(gamma).toBeHidden();
    expect(houdini).toBeHidden();
    expect(interlay).toBeHidden();
    expect(moonwell).toBeHidden();
    expect(oku).toBeHidden();
    expect(zenlink).toBeHidden();
    expect(chronos).toBeHidden();
    expect(avatars).toBeHidden();
    expect(greatEscape).toBeHidden();
    expect(artZero).toBeHidden();
    expect(beatport).toBeHidden();
    expect(destore).toBeHidden();
    expect(kodaDot).toBeHidden();
    expect(moonbeans).toBeHidden();
    expect(rarible).toBeHidden();
    expect(singular).toBeHidden();
    expect(uniqueNetwork).toBeHidden();
    expect(agentWars).toBeHidden();
    expect(chatDkg).toBeHidden();
    expect(acurast).toBeHidden();
    expect(mapMetrics).toBeHidden();
    expect(silencio).toBeHidden();
    expect(airlyft).toBeHidden();
    expect(diode).toBeHidden();
    expect(galaxe).toBeHidden();
    expect(grillChat).toBeHidden();
    expect(heal3).toBeHidden();
    expect(kilt).toBeHidden();
    expect(livetree).toBeHidden();
    expect(mewe).toBeHidden();
    expect(moonFit).toBeHidden();
    expect(teddy).toBeHidden();
    expect(zeitgeist).toBeHidden();
    expect(apillon).toBeHidden();
    expect(carbify).toBeHidden();
    expect(centrifuge).toBeHidden();
    expect(ewx).toBeHidden();
    expect(smartflow).toBeHidden();
    expect(ledger).toBeHidden();
    expect(polkasafe).toBeHidden();
    expect(subwallet).toBeHidden();
    expect(squidRouter).toBeHidden();
    expect(algem).toBeHidden();
    expect(primeProtocol).toBeHidden();
    expect(bagpipes).toBeHidden();
    expect(polkaswap).toBeHidden();
    expect(flappyWud).toBeHidden();
    expect(pinkDrop).toBeHidden();
    expect(fearless).toBeHidden();
    expect(mimir).toBeHidden();
    expect(polkadentity).toBeHidden();

    await all.click({ timeout: 2000 });
  });

  await test.step('"featured" section screenshot', async () => {
    const section = page.getByTestId('cards-block-efb18d9d56b7');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'featured.png',
      snapshotConfig,
    );
  });

  await test.step('assert "submit" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-9983f349ce1b');

    await expect(
      section.getByRole('heading', {
        name: 'Here for the next, newest',
      }),
    ).toBeVisible();
    await expect(section.getByText('Want to get your project or')).toHaveText(
      'Want to get your project or dapp showcased?',
    );
    await expect(
      section.getByRole('link', { name: 'Submit your project' }),
    ).toBeVisible();
  });

  await test.step('"submit" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-9983f349ce1b');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'submit.png',
      snapshotConfig,
    );
  });

  await test.step('assert "disclaimer" section is displayed properly', async () => {
    const section = page.getByTestId('content-block');

    await expect(
      section.getByRole('heading', {
        name: 'Disclaimer',
      }),
    ).toBeVisible();
    await expect(section.getByText('The list of dapps on this')).toHaveText(
      'The list of dapps on this page does not constitute an endorsement and is not exhaustive of all dapps available in the Polkadot ecosystem. Always do your own research before choosing a dapp, and consider consulting a tax and legal advisor as the use of dapps may have tax and legal consequences which are complex and changeable depending on individual circumstances. Learn more on our disclaimer page.',
    );
    await expect(
      section.getByRole('link', { name: 'disclaimer page.' }),
    ).toBeVisible();
    await expect(section.getByText('The list includes apps that')).toHaveText(
      'The list includes apps that are running on Polkadot or its parachains, that are end-user oriented, with TVL, and active community in social networks. If your dapp fulfills these criteria and is not listed here, submit a form.',
    );
    await expect(
      section.getByRole('link', { name: 'submit a form' }),
    ).toBeVisible();
  });

  await test.step('"disclaimer" section screenshot', async () => {
    const section = page.getByTestId('content-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'disclaimer.png',
      snapshotConfig,
    );
  });
});
