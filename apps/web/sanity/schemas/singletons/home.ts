import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'meta',
      type: 'meta',
    }),
    defineField({
      name: 'hero',
      type: 'homeHero',
    }),
    defineField({
      name: 'video',
      type: 'homeVideo',
    }),
    defineField({
      name: 'network',
      type: 'homeNetwork',
    }),
    defineField({
      name: 'stats',
      type: 'homeStats',
    }),
    defineField({
      name: 'ecosystem',
      type: 'homeEcosystem',
    }),
    defineField({
      name: 'build',
      type: 'homeBuild',
    }),
    defineField({
      name: 'connected',
      type: 'homeConnected',
    }),
    defineField({
      name: 'newsletterCTA',
      type: 'array',
      of: [{ type: 'newsletterCTA' }],
      validation: (Rule) => Rule.max(1),
    }),
  ],
});
