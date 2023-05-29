import { ActionIcon, Affix, Drawer, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import ColorSchemeToggle from "./ColorSchemeToggle";

type Props = {};

const Settings = (props: Props) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} position="right" onClose={close} title="Settings">
        <ColorSchemeToggle />
      </Drawer>
      <Affix position={{ bottom: rem(40), right: rem(20) }}>
        <ActionIcon size="xl" radius="lg" onClick={toggle} variant="default">
          <IconAdjustments size="2.125rem" />
        </ActionIcon>
      </Affix>
    </>
  );
};

export default Settings;
