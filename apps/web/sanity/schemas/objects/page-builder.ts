import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'pageBuilder',
  type: 'object',
  fields: [
    defineField({
      name: 'pageBuilder',
      type: 'array',
      description: 'Add content to the page using different blocks',
      of: [
        defineArrayMember({
          name: 'faqs',
          type: 'faqs',
        }),
        defineArrayMember({
          name: 'accordion',
          type: 'accordion',
        }),
        defineArrayMember({
          name: 'buttonBlock',
          type: 'buttonBlock',
        }),
        defineArrayMember({
          name: 'cards',
          type: 'cards',
        }),
        defineArrayMember({
          name: 'cardsSmall',
          type: 'cardsSmall',
        }),
        defineArrayMember({
          name: 'cardsTimeline',
          type: 'cardsTimeline',
        }),
        defineArrayMember({
          name: 'cardsStat',
          type: 'cardsStat',
        }),
        defineArrayMember({
          name: 'cardsSticky',
          type: 'cardsSticky',
        }),
        defineArrayMember({
          name: 'cardsLogo',
          type: 'cardsLogo',
        }),
        defineArrayMember({
          name: 'blockContent',
          type: 'blockContent',
        }),
        defineArrayMember({
          name: 'sideBySide',
          type: 'sideBySide',
        }),
        defineArrayMember({
          name: 'quote',
          type: 'quote',
        }),
        defineArrayMember({
          name: 'mediaBlock',
          type: 'mediaBlock',
        }),
        defineArrayMember({
          name: 'modal',
          type: 'modal',
        }),
        defineArrayMember({
          name: 'form',
          type: 'form',
        }),
        defineArrayMember({
          name: 'cta',
          type: 'cta',
        }),
        defineArrayMember({
          name: 'countdownTimer',
          type: 'countdownTimer',
        }),
      ],
    }),
  ],
});
