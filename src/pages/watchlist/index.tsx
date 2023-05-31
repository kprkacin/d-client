/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { type NextPageWithLayout } from "../_app";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import ChatSpotlight from "@/components/Chat/ChatSpotlight";
import { useWishlist } from "@/hooks/useWishlist";
import WishlistBanner from "@/components/Wishlist/WishlistBanner";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

const WatchlistPage: NextPageWithLayout = () => {
  // const { wishlists, refetch } = useWishlist();
  const { data: wishlists = [], refetch } =
    api.wishlist.allWishlistsWithImages.useQuery();

  const router = useRouter();

  const { theme } = useStyles();

  const { mutate: createNewWishlist } = api.wishlist.newWishlist.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: (res) => {
      void router.push(`/watchlist/${res.id}`);
    },
    onSettled: () => {
      // upToDateCommentsQuery.refetch();
    },
  });
  const { mutate: deleteChat } = api.wishlist.deleteWishlist.useMutation({
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

  const rows = wishlists.map((row) => {
    if (!row) {
      return;
    }
    return (
      <tr key={row?.id}>
        <td>
          <Link href={`/watchlist/${row.id}`}>{row.name}</Link>
        </td>
        <td>
          <Anchor component="button" fz="sm">
            {/* {row.author?.image} */}
            {row.author?.email}
          </Anchor>
        </td>
        <td>{Intl.NumberFormat().format(row?.wishlistRecords?.length)}</td>

        <td>
          <Button
            variant="outline"
            color="red"
            onClick={() => {
              deleteChat({ id: row?.id });
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
          <Group>
            {/* <ChatSpotlight /> */}
            <Button onClick={addNewWishlist}>New Watchlist</Button>
          </Group>
          <Group mah={300}>
            {wishlists.map((row) => (
              <Stack key={row.id}>
                <Link href={`/watchlist/${row.id}`}>{row.name}</Link>

                <WishlistBanner item={row} />
              </Stack>
            ))}
          </Group>
        </Stack>
      </Center>
    </Container>
  );
};

export default WatchlistPage;
