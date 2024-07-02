# polkadot

## Workflow

We use [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):

1. We work on feature branches named `feature/<short-title-of-feature>` (or bugfix branches named `bugfix/<bug-name>`).
2. When the feature is done, we merge it into `develop` with a PR.
3. When `develop` is stable, we merge it into `staging`.
4. We merge into `main` only when we are ready to release a new version.

We can use other branches naming where needed i.e. /chore if the branch is for maintenance or configuration.

## Structure

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: [Next.js 14](https://nextjs.org) app
- `storybook`: [Storybook](https://storybook.js.org/blog/in-app-tour-for-new-users/) app
- `ui`: React component library for all UI components
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `ts-config`: `tsconfig.json`s used throughout the monorepo
- `tailwind-config`: `tsconfig.json`s used throughout the monorepo

#### ui package

This is where all UI components should be created and allow us to build more complicated components using composition.

The current components in the package are based on components from [shadcn/ui](https://ui.shadcn.com/) - the advantages of this are

- they are already designed and tested
- they are already responsive
- they are already accessible

This shouldn't be just a lift and shift, but use them as a base to build upon but not deviate from how they are constructed.

### storybook

Storybook has been added as it's own app package so we can host it on Vercel and use it as a testing tool for the components we build.

### web

This is a nextjs app, the site will be using SSG so this needs to be considered throughout any layout and page construction.

All page features should be contained in the /features folder and any components that are to be reused should be in the /components folder and composed of ui components in the ui package.

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

### Environment variables
Environment variables are coming from Vercel
```
pnpm i -g vercel
```

Then navigate to /apps/web and run
```
vercel link
```

Choose Stink Studios and the project is called polkadot-web
Then run

```
vercel env pull .env.local
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev:turbo
```

To add new packages to specific apps, run the following command:

```
pnpm add <package-name> --filter <app-name>
```

## Static Site Generation vs Dynamic

We currently SSG for the following routes

- [slug] & [childslug] - this is for the content pages
- /blog/[slug] & /newsroom/press-release/[slug] - this is for the blog and newsroom pages
- /blog & /newsroom/press-release - this is for the blog and newsroom index pages - going beyond this seems overkill to render statically as the index page will always be the most hit. All other pages will be served on demand. We redirect to each page/1 as this is ssg.
