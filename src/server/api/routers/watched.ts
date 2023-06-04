/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultWishlistSelect = Prisma.validator<Prisma.WatchedMediaSelect>()({
  id: true,
  author: true,
  mediaId: true,
  watched: true,
  authorId: true,
});

export const watchedRouter = createTRPCRouter({
  allWatched: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;
    return await prisma.watchedMedia.findMany({
      where: { authorId: session?.user.id },
      select: defaultWishlistSelect,
    });
  }),

  //   allWatchedWithImages: protectedProcedure.query(async ({ ctx }) => {
  //     const { prisma, session } = ctx;
  //     const userWishlists = await prisma.watched.findMany({
  //       where: { authorId: session?.user.id },
  //       select: defaultWishlistSelect,
  //     });

  //     const wishlistsWithImagePreview = await Promise.allSettled(
  //       userWishlists.map(async (wishlist) => {
  //         const { mediaType, mediaId } = wishlist.wishlistRecords[0] || {};
  //         if (!mediaType || !mediaId) return wishlist;
  //         const response = await fetch(
  //           `${env.MOVIE_API_URL}3/${mediaType}/${mediaId}?language=en-US&append_to_response=images`,
  //           fetchOptions
  //         );
  //         const media = await response.json();

  //         return {
  //           ...wishlist,
  //           image:
  //             media?.poster_path || media?.backdrop_path || media?.profile_path,
  //         };
  //       })
  //     );

  //     return wishlistsWithImagePreview
  //       .filter((res) => res.status === "fulfilled")
  //       .map((res) => (res as any).value);
  //   }),

  deleteWatchedRecord: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      await prisma.watchedMedia.delete({
        where: { id },
      });
      return true;
    }),
  newWatchedRecord: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { id } = input;

      return await prisma.watchedMedia.upsert({
        where: {
          id: id,
        },
        update: {
          watched: true,
        },
        create: {
          mediaId: id,
          watched: true,
          author: {
            connect: { email: session?.user?.email || undefined },
          },
        },
      });
    }),
  updateWatchedRecord: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        watched: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, watched } = input;
      return await prisma.watchedMedia.update({
        where: {
          id: id,
        },
        data: {
          watched: watched,
        },
      });
    }),
  getWatchedRecord: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      return await prisma.watchedMedia.findUnique({
        where: { id },
        select: defaultWishlistSelect,
      });
    }),
});

/*

  id        String  @id @default(cuid())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  String?
  author    User?   @relation(fields: [authorId], references: [id])
*/
