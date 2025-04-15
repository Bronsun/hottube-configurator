import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CheckboxList, { CheckboxItem } from './CheckboxList';

const meta: Meta<typeof CheckboxList> = {
  title: 'Components/Common/CheckboxList',
  component: CheckboxList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Select Options',
    items: [
      { label: 'Option 1', value: 'option1', required: true },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3', required: true },
    ] as CheckboxItem[],
    onChange: action('onChange'),
    onValidationChange: action('onValidationChange'),
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxList>;

export const Default: Story = {};
