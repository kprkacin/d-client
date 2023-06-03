import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { type TVDetails } from "@/types/discoverTypes";
import TVDetail from "@/components/Discover/DetailsPages/TVDetail";
import WishlistDetail from "@/components/Wishlist/WishlistDetail";
import { type NextPageWithLayout } from "../_app";
import { WishlistDetails } from "@/types/wishlistTypes";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

const WatchlistDetailPage: NextPageWithLayout = () => {
  const router = useRouter();

  const id = router?.query?.id;

  const query = api.wishlist.getWishlist.useQuery({
    id: String(id),
  });
  const { mutate: update } = api.wishlist.updateWishlist.useMutation({
    onError: () => {
      console.error("Error deleting comment");
    },
    onSuccess: (res) => {
      notifications.show({
        title: "",
        color: "green",
        message: "Updated successfully",
      });
    },

    onSettled: () => {
      void query.refetch();
    },
  });

  const { mutate: removeMediaFromWishlist } =
    api.wishlist.removeMediaFromWishlist.useMutation({
      onError: () => {
        console.error("Error deleting comment");
      },
      onSuccess: (res) => {
        notifications.show({
          title: "",
          color: "red",
          message: "Removed from watchlist",
        });
      },

      onSettled: () => {
        void query.refetch();
      },
    });
  const { mutate: addMediaToWishlist } =
    api.wishlist.addMediaToWishlist.useMutation({
      onError: () => {
        console.error("Error deleting comment");
      },
      onSuccess: (res) => {
        notifications.show({
          title: "",
          color: "green",
          message: "Added to watchlist",
        });
      },

      onSettled: () => {
        void query.refetch();
      },
    });

  const updateWishlist = useCallback(
    (data: {
      id: string;
      name: string;
      description?: string;
      genre?: string[];
      public?: boolean;
    }) => {
      update({ ...data, publicValue: data.public });
    },
    [update]
  );

  const removeFromWishlist = useCallback(
    (id: string) => {
      removeMediaFromWishlist({ id });
    },
    [removeMediaFromWishlist]
  );

  const addToWishlist = useCallback(
    (id: string, mediaId: string, mediaType: string) => {
      addMediaToWishlist({ id, mediaId: mediaId.toString(), mediaType });
    },
    [addMediaToWishlist]
  );

  return (
    <Container size="lg">
      <WishlistDetail
        data={query.data as WishlistDetails}
        isLoading={query.isLoading}
        updateWishlist={updateWishlist}
        removeFromWishlist={removeFromWishlist}
        addToWishlist={addToWishlist}
      />
    </Container>
  );
};

export default WatchlistDetailPage;
