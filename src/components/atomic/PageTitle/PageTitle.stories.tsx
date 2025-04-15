import type { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  title: 'Components/Atomic/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Welcome to My Page',
  },
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {};
