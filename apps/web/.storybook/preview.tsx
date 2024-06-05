import React from "react"
import { Preview } from "@storybook/react"

import { cn } from "@shared/ui"

import { manrope, unbounded } from "../styles/fonts"

import "./styles.css"
import "@shared/ui/styles/global.css"

const customViewports = {
  small_mobile: {
    name: "small_mobile",
    styles: {
      width: "359px",
      height: "640px",
    },
  },
  mobile: {
    name: "mobile",
    styles: {
      width: "390px",
      height: "640px",
    },
  },
  tablet: {
    name: "tablet",
    styles: {
      width: "768px",
      height: "640px",
    },
  },
  desktop: {
    name: "desktop",
    styles: {
      width: "1440px",
      height: "1024px",
    },
  },
}

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
    viewport: { viewports: customViewports },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
