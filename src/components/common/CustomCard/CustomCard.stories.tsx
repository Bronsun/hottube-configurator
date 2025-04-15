import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CustomCard from './CustomCard';

const meta: Meta<typeof CustomCard> = {
  title: 'Components/Common/CustomCard',
  component: CustomCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    imageUrl: 'https://',
    description: 'This is a description of the card. It provides details about the content.',
    buttonColor: 'primary',
    buttonText: 'Click Me',
    onClick: action('Card clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof CustomCard>;

export const Default: Story = {};
