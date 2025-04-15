import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DocumentCard from './DocumentCard';

const meta: Meta<typeof DocumentCard> = {
  title: 'Components/Common/DocumentCard',
  component: DocumentCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Sample Document',
    fileName: 'document.pdf',
    fileSize: 1.23,
    imageSrc: 'https://via.placeholder.com/300x200.png?text=Document+Preview',
    onDelete: action('onDelete'),
    onUpload: action('onUpload'),
  },
};

export default meta;
type Story = StoryObj<typeof DocumentCard>;

export const Default: Story = {};
