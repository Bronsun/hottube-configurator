import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NavigationButtons from './NavigationButtons';

const meta: Meta<typeof NavigationButtons> = {
  title: 'Components/Common/NavigationButtons',
  component: NavigationButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onBack: action('onBack'),
    onSkip: action('onSkip'),
    onNext: action('onNext'),
    config: {
      nextLabel: "Next",
      skipLabel: "Skip",
      backLabel: "Back",
      disableBack: false,
      disableNext: false,
      hideSkip: false,
      hideBack: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationButtons>;

export const Default: Story = {};
