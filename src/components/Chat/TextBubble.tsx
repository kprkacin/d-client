import {
  Avatar,
  Box,
  Group,
  MediaQuery,
  createStyles,
  rem,
} from "@mantine/core";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { IconGhost, IconUser } from "@tabler/icons-react";

type Props = {
  role: string;
  message: string;
  animate: boolean;
  image?: string | null;
};

const useStyles = createStyles((theme) => ({
  box: {
    padding: rem(2),
    // border: `1px solid ${theme.colors?.gray?.[2]}`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },
}));

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.02,
    },
  },
};
const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
const TextBubble = (props: Props) => {
  const { role, message, animate, image } = props;

  const { classes, theme } = useStyles();
  const avatar = () => {
    return role !== "user" ? (
      <Avatar radius="xl" size={48}>
        <IconGhost size="100%" color={theme.fn.primaryColor()} />
      </Avatar>
    ) : image ? (
      <Avatar src={image} radius="xl" size={48} />
    ) : (
      <Avatar radius="xl" size={48}>
        <IconUser size="100%" color={theme.fn.primaryColor()} />
      </Avatar>
    );
  };
  return (
    <Group noWrap align="end">
      <MediaQuery
        smallerThan={theme.breakpoints.sm}
        styles={{ display: "none" }}
      >
        {avatar()}
      </MediaQuery>
      <Box className={classes.box}>
        <motion.h4
          style={{ padding: `${rem(1)} ${rem(20)}` }}
          variants={sentence}
          initial={animate && "hidden"}
          animate={animate && "visible"}
        >
          {message.split("").map((char, index) => {
            return (
              <motion.span key={`${char} -${index}`} variants={letter}>
                {char}
              </motion.span>
            );
          })}
        </motion.h4>

        <MediaQuery
          largerThan={theme.breakpoints.sm}
          styles={{ display: "none" }}
        >
          {avatar()}
        </MediaQuery>
      </Box>
    </Group>
  );
};

export default memo(TextBubble);
