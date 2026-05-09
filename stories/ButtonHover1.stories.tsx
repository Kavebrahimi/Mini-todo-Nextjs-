
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ButtonHover1 from "../components/ButtonHover1";

const meta = {
  title: "Components/ButtonHover1",
  component: ButtonHover1,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Create",
  },
} satisfies Meta<typeof ButtonHover1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};
