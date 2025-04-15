import type { Meta, StoryObj } from '@storybook/react';
import StatusComponent from './StatusComponent';

const meta: Meta<typeof StatusComponent> = {
  title: 'Components/Common/StatusComponent',
  component: StatusComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: "success",
    title: "Operation Successful",
    message: "Your operation was completed successfully.",
    buttonText: "Go to Dashboard",
    href: "/dashboard",
  },
};

export default meta;
type Story = StoryObj<typeof StatusComponent>;

export const Default: Story = {};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Operation Failed",
    message: "There was an error processing your request.",
    buttonText: "Retry",
    href: "/retry",
  },
};
