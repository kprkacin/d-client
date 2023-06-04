import {
  createStyles,
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
  rem,
  Stack,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: `${rem(3)} solid`,
    paddingBottom: rem(5),
  },

  statCount: {
    lineHeight: 1.3,
  },

  diff: {
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

interface StatsSegmentsProps {
  similarityData: {
    label: string;
    diff: number;
  }[];
  data: {
    label: string;
    count: string;
  }[];
}

export function CompareSegment({ similarityData, data }: StatsSegmentsProps) {
  const { classes } = useStyles();

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.label === "tv" ? "green" : "blue" }}
      className={classes.stat}
    >
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group position="center" align="flex-end" spacing={0}>
        <Text fz={50} color={stat.label === "tv" ? "green" : "blue"} fw={700}>
          {stat.count}
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text fz="xl" fw={700}>
            Similarity
          </Text>
        </Group>
      </Group>

      <Text c="dimmed" fz="sm" my="md">
        Similarity compared to other watchlists
      </Text>

      <Stack>
        {similarityData.map((stat) => (
          <Stack key={stat.label}>
            <Text fw="bolder" className={classes.progressLabel} c="dimmed">
              {stat.label}
            </Text>
            <Progress
              color={stat.diff > 0 ? "blue" : stat.diff > 50 ? "green" : "red"}
              size={40}
              value={Math.abs(stat.diff) * 100}
              classNames={{ label: classes.progressLabel }}
            />
          </Stack>
        ))}
      </Stack>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}
