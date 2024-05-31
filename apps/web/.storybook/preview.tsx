import React from "react"
import { Preview } from "@storybook/react"

import { cn } from "@shared/ui"

import { manrope, unbounded } from "../styles/fonts"

import "./styles.css"
import "@shared/ui/styles/global.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className={cn(
          unbounded.variable,
          manrope.variable,
          "font-default antialiased"
        )}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
