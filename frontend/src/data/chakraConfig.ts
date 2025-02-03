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
        primary: { value: "1px solid #27272a" },
      },
      sizes: {
        sidebarWidth: { value: "20rem" },
        navbarHeight: { value: "10vh" },
        breadcrumbHeight: { value: "2rem" },
      },
    },
    textStyles,
  },
});

export default createSystem(config, defaultConfig);
