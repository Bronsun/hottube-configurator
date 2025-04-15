import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Atomic/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    message: 'Loading data...',
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};