/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultCommentSelect = Prisma.validator<Prisma.CommentSelect>()({
  id: true,
  author: true,
  mediaId: true,
  authorId: true,
  content: true,
  tags: true,
  title: true,
  createdAt: true,
  updatedAt: true,
});

export const commentRouter = createTRPCRouter({
  getMediaComments: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { id } = input;
      return await prisma.comment.findMany({
        where: { mediaId: id },
        select: defaultCommentSelect,
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  deleteComment: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      await prisma.comment.delete({
        where: { id },
      });
      return true;
    }),
  upsertComment: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string().min(1),
        title: z.string().min(1),
        tags: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { id } = input;

      return await prisma.comment.upsert({
        where: {
          id: id,
        },
        update: {
          content: input.content,
          title: input.title,
          tags: input.tags,
        },
        create: {
          mediaId: id,
          content: input.content,
          title: input.title,
          tags: input.tags,
          author: {
            connect: { email: session?.user?.email || undefined },
          },
        },
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
