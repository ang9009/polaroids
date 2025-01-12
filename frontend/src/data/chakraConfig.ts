import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { textStyles } from "./textStyles";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        secondaryText: { value: "#a1a1aa" },
        border: { value: "#18181b" },
      },
      borders: {
        darkGray: { value: "1px solid #18181b" },
      },
      sizes: {
        navbarHeight: { value: "10vh" },
      },
    },
    textStyles,
  },
});

export default createSystem(config, defaultConfig);
