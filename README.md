# Polkadot GitHub ReadMe

Welcome to the Polkadot.com website repo! This website serves as a crucial gateway for users, developers, and community members to learn about and engage with Polkadot's technology and vision. The site's purpose is to provide accurate, up-to-date information about Polkadot while maintaining the highest standards of performance, accessibility, and user experience. This site is run by the [Distractive marketing team](https://www.distractive.xyz/), but we welcome open-source contributions from the community that help us achieve these goals.

## Table of Contents
* [Tech Stack](#tech-stack)
* [Quick Start Guide](#quick-start-guide)
* [Contribution Guide](#contribution-guide)
* [Code of Conduct](#code-of-conduct)
* [License](#license)
* [Contact Us](#contact-section)

## Tech Stack
This project uses Next.js, React, TypeScript, Tailwind CSS, Sanity CMS, Playwright, and PNPM.

## Quick Start Guide

### Fork the Repo
* Visit the repository URL: https://github.com/Distractive/polkadotcom
* Click the "Fork" button in the top-right corner of the page
* Select your GitHub account as the destination for the fork

### Clone your fork
```bash
git clone git@github.com:[your_github_handle]/polkadotcom.git
```

### Enter the project directory
```bash
cd polkadotcom
```

### Install dependencies
```bash
pnpm install
```

### Create an .env file with the following variables
```
BUILD_FLAG=development
NEXT_PUBLIC_GA_ID=G-ZSKWB953ZL
NEXT_PUBLIC_SANITY_API_VERSION=2023-03-01
NEXT_PUBLIC_SANITY_DATASET=dev
NEXT_PUBLIC_SANITY_PROJECT_ID=qf32zgfm
VERCEL_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_DEPLOYMENT=staging
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=8f4db5e05791dcbe78707e98bdbb580a
NEXT_PUBLIC_ALGOLIA_APP_ID=QRFH5X5F32
NEXT_PUBLIC_ALGOLIA_BLOG_INDEX_NAME=blog
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=page
```

### Add the upstream repository
```bash
git remote add upstream https://github.com/Distractive/polkadotcom.git
```

### Verify the new remote
```bash
git remote -v
```

### Create a new feature branch off of the develop branch for your changes
```bash
git checkout develop
git checkout -b feature/your-feature-name
```

### Run the dev server
```bash
pnpm dev
```

## Contribution Guide
Contributions are welcome — whether it's a bug fix, feature, or copy suggestion. Please follow our contribution guide for a breakdown of submissions we accept and details on how to get started.

## Code of Conduct
The Polkadot website has transitioned to an open-source project, welcoming contributions that enhance our technical foundation while maintaining high standards of quality and security. We foster an inclusive environment where developers of all backgrounds can contribute constructively to our codebase. Our community values a focus on technical excellence, security consciousness, and collaborative development in alignment with Polkadot's principles of decentralization.

Contributors must maintain professional conduct, focusing on technical merit and constructive communication. We do not tolerate harassment, discrimination, or promotion of financial interests. Violations of these standards may result in warnings or removal from the project. For any concerns or violations, please contact the project maintainers directly.

## License
This project is licensed under the Apache License 2.0 – see the [LICENSE](./LICENSE) file for details.

## Contact Us
To contact the maintainers of this repo, send an email to digital [at] distractive [dot] xyz.

# testing pipelines