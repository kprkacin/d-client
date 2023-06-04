import React from "react";
import { type PersonDetails } from "@/types/discoverTypes";
import {
  Center,
  Flex,
  Text,
  Group,
  Image,
  Stack,
  Title,
  Badge,
  createStyles,
  Paper,
  Spoiler,
} from "@mantine/core";
import { posterSizes } from "@/utils/consts";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { dateFormat } from "@/utils/helpers";
import SkeletonPage from "./SkeletonPage";
import CreditsList from "./components/CreditsList";

type Props = {
  data: PersonDetails;
  isLoading: boolean;
};

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

const PersonDetail = (props: Props) => {
  const { data, isLoading } = props;

  const { classes, theme } = useStyles();

  const lg = useMediaQuery(`(max-width: ${theme.breakpoints.xl})`);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  if (isLoading) return <SkeletonPage />;
  return (
    <Center component={Paper} className={classes.center} p={theme.spacing.md}>
      <Flex direction="column" w="100%">
        <Group
          w="100%"
          noWrap={lg || mobile ? false : true}
          position="apart"
          align="start"
          spacing={theme.spacing.lg}
        >
          <Image
            withPlaceholder
            src={`https://image.tmdb.org/t/p/${posterSizes.original}/${data?.profile_path}`}
            alt="Detail Banner"
            fit="contain"
            height={400}
            width={400}
          />
          <Stack
            my={theme.spacing.xl}
            spacing={0}
            w="100%"
            align="start"
            justify="start"
          >
            <Group align="center">
              <Title>{data.name} </Title>
              {Math.random() < 0.5 ? (
                <Badge color="green.9">
                  <Center>
                    <IconTrendingUp />
                    <Text ml={theme.spacing.xs}>{data.popularity}</Text>
                  </Center>
                </Badge>
              ) : (
                <Badge color="red.9">
                  <Center>
                    <IconTrendingDown />
                    <Text ml={theme.spacing.xs}>{data.popularity}</Text>
                  </Center>
                </Badge>
              )}
            </Group>
            <Group>
              <Text fz="sm" c="dimmed">
                Born: {dateFormat(data.birthday)}
              </Text>
              <Text fz="sm" c="dimmed">
                Known for: {data.known_for_department}
              </Text>
            </Group>

            <Spoiler maxHeight={150} showLabel="More" hideLabel="Less">
              <Text my={theme.spacing.xl}>{data.biography}</Text>
            </Spoiler>
          </Stack>
        </Group>

        <CreditsList {...data.combined_credits} />
      </Flex>
    </Center>
  );
};

export default PersonDetail;
