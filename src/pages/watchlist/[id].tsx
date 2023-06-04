import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import WishlistDetail from "@/components/Wishlist/WishlistDetail";
import { type NextPageWithLayout } from "../_app";
import { type WishlistDetails } from "@/types/wishlistTypes";
import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

const WatchlistDetailPage: NextPageWithLayout = () => {
  const router = useRouter();

  const id = router?.query?.id;

  const query = api.wishlist.getWishlist.useQuery({
    id: String(id),
  });
  const { mutate: update, isLoading: updateLoading } =
    api.wishlist.updateWishlist.useMutation({
      onError: () => {
        console.error("Error deleting comment");
      },
      onSuccess: () => {
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

  const { mutate: removeMediaFromWishlist, isLoading: removeLoading } =
    api.wishlist.removeMediaFromWishlist.useMutation({
      onError: () => {
        console.error("Error deleting comment");
      },
      onSuccess: () => {
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
  const { mutate: addMediaToWishlist, isLoading: addLoading } =
    api.wishlist.addMediaToWishlist.useMutation({
      onError: () => {
        console.error("Error deleting comment");
      },
      onSuccess: () => {
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
        updateLoading={updateLoading}
        addRemoveLoading={addLoading || removeLoading}
        updateWishlist={updateWishlist}
        removeFromWishlist={removeFromWishlist}
        addToWishlist={addToWishlist}
      />
    </Container>
  );
};

export default WatchlistDetailPage;
