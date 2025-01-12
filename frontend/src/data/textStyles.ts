import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  title: {
    description: "Used for large main headings",
    value: {
      fontFamily: "Inter",
      fontWeight: "600",
      fontSize: "2rem",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
  body: {
    description: "Used for paragraphs or sentences",
    value: {
      fontFamily: "Inter",
      fontSize: "1rem",
      letterSpacing: "0",
      textTransform: "None",
    },
  },
});
