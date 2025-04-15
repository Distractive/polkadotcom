'use client';

import { deskStructure } from '@/sanity/desk';
import * as resolve from '@/sanity/plugins/resolve';
import { schema } from '@/sanity/schema';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { groqdPlaygroundTool } from 'groqd-playground';
import { type ConfigContext, type CurrentUser, defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { structureTool } from 'sanity/structure';

import { env } from '@/env.mjs';
import { presentationTool } from 'sanity/presentation';

// Helper function to check user roles
const userHasRole = (user: CurrentUser | null, role: string): boolean => {
  return user?.roles?.some((r) => r.name === role) ?? false;
};

export default defineConfig({
  history: 'hash',
  basePath: '/admin',
  name: 'default',
  title: 'polkadot',
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  // schema,
  schema: {
    ...schema,
    templates: (prev) => {
      const landingChild = {
        id: 'landing-child',
        title: 'Landing: Pages',
        schemaType: 'page',
        parameters: [{ name: 'parentId', title: 'Parent ID', type: 'string' }],
        // This value will be passed-in from desk structure
        value: ({ parentId }: { parentId: string }) => ({
          parent: { _type: 'reference', _ref: parentId },
        }),
      };

      return [...prev, landingChild];
    },
  },
  plugins:
    process.env.NODE_ENV === 'development'
      ? [
          // structureTool({
          //   structure: deskStructure,
          // }),
          // visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
          // groqdPlaygroundTool(),
          codeInput(),
          presentationTool({
            resolve,
            previewUrl: {
              previewMode: {
                enable: '/api/draft',
              },
            },
          }),
          // media(),
          // vercelDeployTool(),
        ]
      : [
          // structureTool({
          //   structure: deskStructure,
          // }),
          codeInput(),
          presentationTool({
            resolve,
            previewUrl: {
              previewMode: {
                enable: '/api/draft',
              },
            },
          }),
          // media(),
          // vercelDeployTool(),
        ],
  // Show or hide vercelDeployTool based on user role
  tools: (prevTools, context: ConfigContext) => {
    const { currentUser } = context;

    if (!userHasRole(currentUser, 'administrator')) {
      return prevTools.filter((tool) => tool.name !== 'vercel-deploy');
    }

    return prevTools;
  },
});
