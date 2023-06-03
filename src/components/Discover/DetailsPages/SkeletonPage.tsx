import React from "react";
import {
  Center,
  Flex,
  Group,
  Stack,
  createStyles,
  Paper,
  LoadingOverlay,
  Skeleton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  center: {
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[9]
        : theme.colors.gray[0],
  },
  button: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[9]
        : theme.colors.gray[3],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[1]
        : theme.colors.dark[9],
  },
}));

const SkeletonPage = () => {
  const { classes, theme } = useStyles();

  const lg = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Center component={Paper} className={classes.center} p={theme.spacing.md}>
      <Flex direction="column" w="100%">
        <LoadingOverlay
          loaderProps={{
            size: "xl",
          }}
          visible
          h="100vh"
          overlayBlur={1}
        />
        <Group
          w="100%"
          noWrap={lg || mobile ? false : true}
          position="apart"
          align="start"
          spacing={theme.spacing.lg}
        >
          <Skeleton my={theme.spacing.xs} height={400} width={400} />

          <Stack
            my={theme.spacing.xl}
            spacing={0}
            w="100%"
            align="start"
            justify="start"
          >
            <Skeleton my={theme.spacing.xs} height={90} />

            <Skeleton my={theme.spacing.xs} height={50} width="50%" />
            <Skeleton my={theme.spacing.xs} height={50} width="50%" />

            <Skeleton my={theme.spacing.xs} height={50} width="25%" />
            <Skeleton my={theme.spacing.xs} height={50} width="25%" />
            <Skeleton my={theme.spacing.xs} height={50} width="25%" />
            <Skeleton my={theme.spacing.xs} height={50} width="25%" />

            <Skeleton my={theme.spacing.xs} height={200} />
          </Stack>
        </Group>
        <Skeleton my={theme.spacing.xs} height={400} />
      </Flex>
    </Center>
  );
};

export default SkeletonPage;
