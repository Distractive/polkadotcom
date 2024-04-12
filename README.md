# polkadot

## Structure

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: [Next.js 14](https://nextjs.org) app
- `storybook`: [Storybook](https://storybook.js.org/blog/in-app-tour-for-new-users/) app
- `ui`: React component library for all UI components
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `ts-config`: `tsconfig.json`s used throughout the monorepo
- `tailwind-config`: `tsconfig.json`s used throughout the monorepo

### Utilities

This turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```
