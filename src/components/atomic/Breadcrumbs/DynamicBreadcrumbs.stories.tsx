import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import DynamicBreadcrumbs from './DynamicBreadcrumbs';

const meta: Meta<typeof DynamicBreadcrumbs> = {
    title: 'Components/Atomic/DynamicBreadcrumbs',
    component: DynamicBreadcrumbs,
    tags: ['autodocs'],
    
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/home/about/contact']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
