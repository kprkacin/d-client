import { Badge, Box, Text, createStyles, rem } from "@mantine/core";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  role?: "user | response";
  message?: string;
};

const useStyles = createStyles((theme) => ({
  box: {
    padding: rem(2),
    border: `4px solid ${theme.colors?.blue?.[3]}`,
    borderRadius: rem(16),
    backgroundColor: theme.colors?.pastelBlue?.[1],
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
  const { role, message } = props;

  const { classes } = useStyles();
  const text =
    message ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <Box className={classes.box}>
      <motion.h3 variants={sentence} initial="hidden" animate="visible">
        {text.split("").map((char, index) => {
          return (
            <motion.span key={char + "-" + index} variants={letter}>
              {char}
            </motion.span>
          );
        })}
      </motion.h3>
    </Box>
  );
};

export default TextBubble;
