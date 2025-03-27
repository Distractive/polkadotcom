import { slugifier } from '@/sanity/lib/slugifier';
import { CogIcon, DocumentIcon, SearchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { title: 'Config', name: 'config', icon: CogIcon },
    { title: 'Content', name: 'content', icon: DocumentIcon },
    { title: 'Meta', name: 'meta', icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The title of the page used for navigation',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        //@ts-ignore
        source: (doc) => ({ doc }),
        //@ts-ignore
        slugify: slugifier,
      },
      group: 'config',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'breadcrumb',
      type: 'string',
      group: 'config',
    }),
    defineField({
      name: 'meta',
      type: 'meta',
      group: 'meta',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
      group: 'config',
      hidden: ({ parent }) => parent.hideHeader,
    }),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
      title: 'Page builder',
      group: 'content',
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'landing' }],
      options: {
        filter: '!defined(parent)',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'parent.title',
    },
    //@ts-ignore
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `– ${subtitle}` : '',
    }),
  },
});
