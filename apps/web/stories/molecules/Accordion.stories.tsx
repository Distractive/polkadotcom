import type { Meta, StoryObj } from '@storybook/react';

import { AccordionBlock } from '@/features/page/blocks/accordion';

const meta = {
  title: 'Molecules/Accordion',
  component: AccordionBlock,
  argTypes: {},
} satisfies Meta<typeof AccordionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  args: {
    accordion: {
      _type: 'accordion',
      title: 'Accordion Title',
      hasNumbers: true,
      hasTitleOnSide: false,
      body: null,
      //@ts-ignore
      image: { asset: { url: '/image-placeholder.png' } },
      _key: 'd1b1',
      items: [
        {
          _key: '092dead156a5',
          heading: 'Header',
          content: [
            {
              _type: 'block',
              _key: 'a7b9ef9b8039',
              children: [
                {
                  _key: '3ada15f50adc',
                  _type: 'span',
                  text: 'This is a title',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'h4',
            },
            {
              _type: 'block',
              _key: 'ad3c473deea6',
              children: [
                {
                  _key: '20e28fbe1301',
                  _type: 'span',
                  text: 'this is body',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'normal',
            },
            {
              _type: 'break',
              style: 'lineBreak',
            },
            {
              _type: 'block',
              _key: '44a9c1cd9abd',
              children: [
                {
                  _key: '91b0e2a08b15',
                  _type: 'span',
                  text: 'This is a title',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'h4',
            },
            {
              _type: 'block',
              _key: '30e7be72c145',
              children: [
                {
                  _key: '914e56ff3dc7',
                  _type: 'span',
                  text: 'this is a body',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'normal',
            },
          ],
        },
        {
          _key: '39560800d3a81572f4001af514a6eee4',
          heading: 'Item Two',
          content: [
            {
              _type: 'block',
              _key: 'a7b9ef9b8039',
              children: [
                {
                  _key: '3ada15f50adc',
                  _type: 'span',
                  text: 'This is a title',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'h4',
            },
            {
              _type: 'block',
              _key: 'ad3c473deea6',
              children: [
                {
                  _key: '20e28fbe1301',
                  _type: 'span',
                  text: 'this is body',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'normal',
            },
            {
              _type: 'break',
              style: 'lineBreak',
            },
            {
              _type: 'block',
              _key: '44a9c1cd9abd',
              children: [
                {
                  _key: '91b0e2a08b15',
                  _type: 'span',
                  text: 'This is a title',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'h4',
            },
            {
              _type: 'block',
              _key: '30e7be72c145',
              children: [
                {
                  _key: '914e56ff3dc7',
                  _type: 'span',
                  text: 'this is a body',
                  marks: [],
                },
              ],
              markDefs: [],
              style: 'normal',
            },
          ],
        },
      ],
    },
  },
};
