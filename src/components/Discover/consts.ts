import { createStyles } from "@mantine/core";

export const useDiscoverStyles = createStyles((theme) => ({
  paper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[0],
    // boxShadow: `0 8px 16px 0 ${theme.colors.gray[6]}`,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    // backdropFilter: 'blur( 12px )',
    // WebkitBackdropFilter: 'blur( 12px )',
    // borderRadius: '10px',
    // border: '1px solid rgba( 255, 255, 255, 0.18 )',
  },
}));
