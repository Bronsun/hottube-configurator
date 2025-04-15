import type { Meta, StoryObj } from '@storybook/react';
import LinkImage from './LinkImage';

const meta: Meta<typeof LinkImage> = {
  title: 'Components/Atomic/LinkImage',
  component: LinkImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    alt: 'Company Logo',
    width: 60,
    height: 40,
    href: '/panel',
  },
};

export default meta;
type Story = StoryObj<typeof LinkImage>;

export const Default: Story = {};
