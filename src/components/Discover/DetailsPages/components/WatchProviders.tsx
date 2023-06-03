import { type WatchProviderResults } from "@/types/discoverTypes";
import { posterSizes } from "@/utils/consts";
import {
  createStyles,
  rem,
  Stack,
  Text,
  Title,
  SimpleGrid,
  UnstyledButton,
  Avatar,
  Center,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

interface WatchProvidersProps {
  data: WatchProviderResults;
}

const WatchProviders: React.FC<WatchProvidersProps> = (props) => {
  const { data } = props;
  const { classes, theme } = useStyles();

  const res = data.results["US"] || data.results["CA"] || data.results["GB"];
  if (!res?.buy?.length) return null;
  return (
    <Stack>
      <Title my={theme.spacing.xl}>Watch here</Title>
      <Center>
        <SimpleGrid
          cols={6}
          mt="md"
          breakpoints={[
            { maxWidth: theme.breakpoints.lg, cols: 5, spacing: "md" },
            { maxWidth: theme.breakpoints.md, cols: 4, spacing: "sm" },
            { maxWidth: theme.breakpoints.sm, cols: 3, spacing: "sm" },
          ]}
        >
          {res?.buy?.map((provider) => (
            <UnstyledButton key={provider.provider_id} className={classes.item}>
              <Avatar
                src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${provider.logo_path}`}
                size="2rem"
              />
              <Text size="xs" fw="bold" c="dimmed" mt={7}>
                {provider.provider_name}
              </Text>
            </UnstyledButton>
          ))}
        </SimpleGrid>
      </Center>
    </Stack>
  );
};

export default WatchProviders;
