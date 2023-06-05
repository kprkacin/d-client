/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  Switch,
  createStyles,
  Checkbox,
  rem,
} from "@mantine/core";
import { type NextPageWithLayout } from "../_app";
import { api } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import WishlistSpotlight from "@/components/Chat/WishlistSpotlight";
import { type WishlistWithImage } from "@/types/wishlistTypes";
import { posterSizes } from "@/utils/consts";
import { useState } from "react";
import { IconChartInfographic } from "@tabler/icons-react";
import WishlistCompareModal from "@/components/Wishlist/WishlistCompareModal";
import { notifications } from "@mantine/notifications";

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
  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);
  const router = useRouter();
  const { classes, theme } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length ===
      (showPublic ? publicWishlists.length : wishlists.length)
        ? []
        : (showPublic ? publicWishlists : wishlists).map((item) => item.id)
    );

  const { mutate: createNewWishlist } = api.wishlist.newWishlist.useMutation({
    onError: (err) => {
      notifications.show({
        title: err.data?.code,
        message: err.message,
        color: "red",
      });
    },
    onSuccess: (res) => {
      void router.push(`/watchlist/${res.id}`);
    },
    onSettled: () => {
      void refetch();
    },
  });
  const { mutate: deletWishlist } = api.wishlist.deleteWishlist.useMutation({
    onError: (err) => {
      notifications.show({
        title: err.data?.code,
        message: err.message,
        color: "red",
      });
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
          <Checkbox
            checked={selection.includes(row.id)}
            onChange={() => toggleRow(row.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Link href={`/watchlist/${row.id}`}>
            <Group align="center" noWrap>
              {" "}
              <Image
                withPlaceholder
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
            <Grid.Col span={8} sm={10}>
              <WishlistSpotlight />
            </Grid.Col>

            <Grid.Col span={4} sm={2}>
              <Button onClick={addNewWishlist}>New Watchlist</Button>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group>
                <Switch
                  checked={showPublic}
                  label="Show Public"
                  onChange={(event) =>
                    setShowPublic(event.currentTarget.checked)
                  }
                />
                <Button
                  disabled={!selection.length}
                  onClick={() => setShowModal(true)}
                  leftIcon={<IconChartInfographic size="1.2rem" />}
                >
                  Compare ({selection.length})
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
          <ScrollArea>
            <Table verticalSpacing="xs">
              <thead>
                <tr>
                  <th style={{ width: rem(40) }}>
                    <Checkbox
                      onChange={toggleAll}
                      checked={
                        selection.length ===
                        (showPublic ? publicWishlists : wishlists).length
                      }
                      indeterminate={
                        selection.length > 0 &&
                        selection.length !==
                          (showPublic ? publicWishlists : wishlists).length
                      }
                      transitionDuration={0}
                    />
                  </th>
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
      <WishlistCompareModal
        opened={showModal}
        onClose={() => setShowModal(false)}
        selection={selection}
        data={showPublic ? publicWishlists : wishlists}
      />
    </Container>
  );
};
export default WatchlistPage;
