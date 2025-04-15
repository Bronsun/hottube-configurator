import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SegmentedStepper from './SegmentedStepper';

const meta: Meta<typeof SegmentedStepper> = {
  title: 'Components/Common/SegmentedStepper',
  component: SegmentedStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    steps: ["Step 1", "Step 2", "Step 3", "Step 4"],
    activeStep: 1,
    title: "Onboarding",
    subtitle: "Progress",
    onBack: action("onBack"),
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedStepper>;

export const Default: Story = {};
