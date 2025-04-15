import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router";
import PanelLayout from "./PanelLayout";
import { DummyAuthProvider } from "../../mockups/DummyAuthContext"; // adjust the path accordingly

const meta: Meta<typeof PanelLayout> = {
  title: "Layouts/PanelLayout",
  component: PanelLayout,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => (
      <DummyAuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<PanelLayout />}>
              <Route index element={<div>Content goes here</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </DummyAuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PanelLayout>;

export const Default: Story = {};
