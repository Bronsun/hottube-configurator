import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";
import { DummyAuthProvider } from "../../mockups/DummyAuthContext";

const meta: Meta<typeof Navbar> = {
  title: "Layouts/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <DummyAuthProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </DummyAuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
