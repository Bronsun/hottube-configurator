import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import SideMenu from './SideMenu';
import { LinkItem } from '../../../models/LinkItem';

const meta: Meta<typeof SideMenu> = {
  title: 'Layouts/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/home']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    title: 'Main Menu',
    links: [
      { label: 'Home', href: '/', path: '/home', title: 'Home' } as LinkItem,
      { label: 'About', href: '/about', path: '/about', title: 'About' } as LinkItem,
      { label: 'Contact', href: '/contact', path: '/contact', title: 'Contact' } as LinkItem,
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {};
