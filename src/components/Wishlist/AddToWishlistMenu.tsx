import {
  IconBookmark,
  IconSquareRoundedMinus,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { Group, Menu, ActionIcon, useMantineTheme } from "@mantine/core";
import { useWishlist } from "@/hooks/useWishlist";
import { type FloatingPosition } from "@mantine/core/lib/Floating";

interface AddToWishlistMenuProps {
  mediaId: string;
  mediaType: string;
  position?: FloatingPosition;
  iconSize?: number;
  iconStroke?: string;
}

const rightSection = (isInWishlist: boolean, color: string) => {
  return (
    <Group position="right">
      {isInWishlist ? (
        <IconSquareRoundedMinus size="1.5rem" stroke={1} color={color} />
      ) : (
        <IconSquareRoundedPlus size="1.5rem" stroke={1} color={color} />
      )}
    </Group>
  );
};
const AddToWishlistMenu: React.FC<AddToWishlistMenuProps> = (props) => {
  const { mediaId, mediaType, position = "right" } = props;
  const { wishlists, isInWishlist, addToWishlist, removeFromWishlist } =
    useWishlist();
  const theme = useMantineTheme();
  return (
    <Menu
      position={position}
      withArrow
      trigger="hover"
      arrowPosition="center"
      transitionProps={{ transition: "rotate-right", duration: 150 }}
    >
      <Menu.Target>
        <ActionIcon variant="transparent" size={56}>
          <IconBookmark
            size="8rem"
            stroke={1}
            color={theme.fn.primaryColor()}
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Watchlists</Menu.Label>
        {wishlists.map((wishlist) => {
          if (!wishlist) return null;
          const inCurrentWishlist = isInWishlist(mediaId, wishlist.id);
          console.log(inCurrentWishlist, "inCurrentWishlist");
          return (
            <Menu.Item
              key={wishlist?.id}
              rightSection={rightSection(
                inCurrentWishlist,
                theme.fn.primaryColor()
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("clicked");
                if (inCurrentWishlist) {
                  removeFromWishlist(wishlist.id, mediaId);
                } else {
                  addToWishlist(wishlist.id, mediaId, mediaType);
                }
              }}
            >
              {wishlist?.name}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default AddToWishlistMenu;
