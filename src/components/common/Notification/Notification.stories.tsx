import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/Common/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Success',
    severity: 'success',
    children: 'This is a notification message.',
    onClose: action('onClose'),
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {};
