import type { Meta, StoryObj } from '@storybook/react';

import { PostPagination } from '@/features/posts/pagination';

const meta = {
  title: 'Atoms/Pagination',
  component: PostPagination,
} satisfies Meta<typeof PostPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BlogPagination: Story = {
  args: {
    total: 18,
    limit: 1,
    page: 1,
    type: 'blog',
  },
};
