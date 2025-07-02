import { defineType } from 'sanity';

export default defineType({
  name: 'storeButton',
  type: 'object',
  title: 'Store Button',
  fields: [
    {
      name: 'store',
      type: 'string',
      title: 'Store',
      options: {
        list: [
          { title: 'App Store', value: 'appstore' },
          { title: 'Google Play', value: 'playstore' },
        ],
      },
    },
    {
      name: 'href',
      type: 'url',
      title: 'Store Link',
    },
  ],
  preview: {
    select: {
      store: 'store',
      href: 'href',
    },
    prepare(selection) {
      const { store } = selection;
      const storeTitle =
        store === 'appstore' ? 'App Store' : 'Google Play Store';
      return {
        title: storeTitle,
      };
    },
  },
});
