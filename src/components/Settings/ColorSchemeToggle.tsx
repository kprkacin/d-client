/* eslint-disable @typescript-eslint/unbound-method */
import {
  useMantineColorScheme,
  SegmentedControl,
  Group,
  Center,
  Box,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  console.log(colorScheme, toggleColorScheme, "colorScheme, toggleColorScheme");

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={colorScheme}
        onChange={(value: "light" | "dark") => toggleColorScheme(value)}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <IconSun size="1rem" stroke={1.5} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <IconMoon size="1rem" stroke={1.5} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};
export default ColorSchemeToggle;
