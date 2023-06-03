/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Anchor,
  Button,
  Center,
  Text,
  Container,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Table,
  Image,
  useMantineTheme,
  Switch,
  createStyles,
} from "@mantine/core";
import { type NextPageWithLayout } from "../_app";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import WishlistBanner from "@/components/Wishlist/WishlistBanner";
import ChatSpotlight from "@/components/Chat/ChatSpotlight";
import { useMediaQuery } from "@mantine/hooks";
import WishlistSpotlight from "@/components/Chat/WishlistSpotlight";
import { WishlistWithImage } from "@/types/wishlistTypes";
import { posterSizes } from "@/utils/consts";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[7],
  },
}));

const WatchlistPage: NextPageWithLayout = () => {
  // const { wishlists, refetch } = useWishlist();
  const { data: wishlists = [], refetch } =
    api.wishlist.allWishlistsWithImages.useQuery();
  const { data: publicWishlists = [] } =
    api.wishlist.publicWishlistsWithImages.useQuery();
  const [showPublic, setShowPublic] = useState(false);
  const router = useRouter();
  const { classes, theme } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const { mutate: createNewWishlist } = api.wishlist.newWishlist.useMutation({
    onError: () => {
      console.error("Error creating watchlist");
    },
    onSuccess: (res) => {
      void router.push(`/watchlist/${res.id}`);
    },
    onSettled: () => {
      void refetch();
    },
  });
  const { mutate: deletWishlist } = api.wishlist.deleteWishlist.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onSettled: () => {
      void refetch();
      // upToDateCommentsQuery.refetch();
    },
  });

  const addNewWishlist = () => {
    createNewWishlist();
  };

  const rows = (
    (showPublic ? publicWishlists : wishlists) as WishlistWithImage[]
  ).map((row) => {
    return (
      <tr key={row.id}>
        <td>
          <Link href={`/watchlist/${row.id}`}>
            <Group align="center" noWrap>
              {" "}
              <Image
                src={`https://image.tmdb.org/t/p/${posterSizes.w500}/${row?.image}`}
                height={80}
                width={80}
                alt={"Wishlist Banner"}
              />
              {row.name}
            </Group>
          </Link>
        </td>
        {!mobile && (
          <>
            <td>
              <Anchor fz="sm" align="center">
                {row.author?.email}
              </Anchor>
            </td>
            <td>{Intl.NumberFormat().format(row.wishlistRecords.length)}</td>
            <td>
              <Text
                fz="sm"
                color={theme.colorScheme === "dark" ? "gray" : "dark"}
              >
                {row.updatedAt.toDateString()}
              </Text>
            </td>
            <td>
              <Text
                fz="sm"
                color={theme.colorScheme === "dark" ? "gray" : "dark"}
              >
                {row.createdAt.toDateString()}
              </Text>
            </td>
          </>
        )}
        <td>
          <Switch checked={row.public} readOnly />
        </td>
        <td>
          <Button
            variant="outline"
            color="red.9"
            classNames={{
              root: classes.label,
            }}
            onClick={() => {
              deletWishlist({ id: row.id });
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container size="md">
      <Center>
        <Stack>
          <Grid align="start">
            <Grid.Col span={4} sm={8}>
              <WishlistSpotlight />
            </Grid.Col>

            <Grid.Col span={8} sm={4}>
              <Group>
                <Switch
                  checked={showPublic}
                  label="Show Public"
                  onChange={(event) =>
                    setShowPublic(event.currentTarget.checked)
                  }
                />
                <Button onClick={addNewWishlist}>New Watchlist</Button>
              </Group>
            </Grid.Col>
          </Grid>
          <ScrollArea>
            <Table verticalSpacing="xs">
              <thead>
                <tr>
                  <th>Name</th>
                  {!mobile && (
                    <>
                      <th>Author</th>
                      <th>Number of items</th>
                      <th>Last Updated</th>
                      <th>Created At</th>
                    </>
                  )}
                  <th>Public</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Stack>
      </Center>
    </Container>
  );
};
export default WatchlistPage;
