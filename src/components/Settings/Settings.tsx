import {
  ActionIcon,
  Affix,
  Drawer,
  Space,
  createStyles,
  rem,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { useSettings } from "@/hooks/useSettings";
import { UserButton } from "../User/UserButton";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));
const Settings = () => {
  const { opened, toggle, close } = useSettings();
  const { classes, theme } = useStyles();

  return (
    <>
      <Drawer opened={opened} position="right" onClose={close} title="Settings">
        <UserButton />
        <Space />
        <ColorSchemeToggle />
      </Drawer>
      <Affix
        className={classes.hiddenMobile}
        position={{ bottom: rem(40), right: rem(20) }}
      >
        <ActionIcon size="xl" radius="lg" onClick={toggle} variant="default">
          <IconAdjustments size="2.125rem" color={theme.fn.primaryColor()} />
        </ActionIcon>
      </Affix>
    </>
  );
};

export default Settings;
