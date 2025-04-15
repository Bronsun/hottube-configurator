import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Routes, Route } from "react-router";
import LoginLayout from "./LoginLayout";
import { DummyAuthProvider } from "../../mockups/DummyAuthContext";

const meta: Meta<typeof LoginLayout> = {
  title: "Layouts/LoginLayout",
  component: LoginLayout,
  parameters: { layout: "fullscreen" },
  decorators: [
    () => (
      <DummyAuthProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<LoginLayout />}>
              <Route
                index
                element={
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    Login Form Goes Here
                  </div>
                }
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </DummyAuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginLayout>;

export const Default: Story = {};
