import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Common/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    children: [
      <Box
        key="slide1"
        sx={{
          backgroundColor: 'lightblue',
          height: 300,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Slide 1</Typography>
      </Box>,
      <Box
        key="slide2"
        sx={{
          backgroundColor: 'lightgreen',
          height: 300,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Slide 2</Typography>
      </Box>,
      <Box
        key="slide3"
        sx={{
          backgroundColor: 'lightcoral',
          height: 300,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Slide 3</Typography>
      </Box>,
    ],
  },
};
