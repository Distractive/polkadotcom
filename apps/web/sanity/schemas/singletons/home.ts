import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'home',
  type: 'document',
  title: 'Home',
  icon: HomeIcon,
  fields: [
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
      name: 'meta',
      type: 'meta',
    }),
  ],
});
