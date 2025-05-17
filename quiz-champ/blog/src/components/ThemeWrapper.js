import React from "react"
import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    text: "#222",
    background: "#f9f9f9",
    primary: "#007acc",
    correct: "green",
    wrong: "red",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48],
}

export const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)