import { BlockElementIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'menu',
      type: 'array',
      title: 'Menu',
      of: [{ type: 'menu' }],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [{ type: 'socialLink' }],
    }),
  ],
});
