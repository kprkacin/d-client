import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { env } from "@/env.mjs";

const defaultChatSelect = Prisma.validator<Prisma.ChatSessionSelect>()({
  id: true,
  author: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  chatRecords: true,
});
const defaultChatRecordSelect = Prisma.validator<Prisma.ChatRecordSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true,
  paragraph: true,
  ids: true,
  chatSessionId: true,
});

const base: CreateChatCompletionRequest["messages"] = [
  {
    role: "user",
    content:
      "Act like a film or tv recommendation expert based on the following question respond with a small paragraph explaining your choice of media and a list of exactly 10 recommendations after the paragraph only put valid imdb IDs in the list.Before recommendations always say 'Recommendation list:'",
  },
  {
    role: "assistant",
    content:
      "Certainly! I'm here to help. Please go ahead and ask your question, and I'll provide you with a list of 10 recommendations based on it.",
  },
];

const mockdata =
  "If you enjoyed The Lord of the Rings trilogy, I would highly recommend checking out The Hobbit trilogy. It follows a similar storyline and is set in the same world as The Lord of the Rings. The Hobbit trilogy is directed by Peter Jackson, who also directed The Lord of the Rings trilogy, making for a very seamless transition between the two. Here are some other recommendations that are similar in theme and tone to The Lord of the Rings:\n\nRecommendation list:\n- Harry Potter and the Sorcerer's Stone (tt0241527)\n- The Chronicles of Narnia: The Lion, the Witch and the Wardrobe (tt0363771)\n- Pirates of the Caribbean: The Curse of the Black Pearl (tt0325980)\n- The NeverEnding Story (tt0088323)\n- Willow (tt0096446)\n- The Dark Crystal (tt0083791)\n- Labyrinth (tt0091369)\n- Eragon (tt0449010)\n- The Princess Bride (tt0093779)";
export const chatRouter = createTRPCRouter({
  allChats: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;
    const userSessions = await prisma.chatSession.findMany({
      where: { authorId: session?.user.id },
      select: defaultChatSelect,
    });

    return userSessions;
  }),
  newSession: protectedProcedure.mutation(async ({ ctx }) => {
    const { prisma, session } = ctx;
    return await prisma.chatSession.create({
      data: {
        name: "Chat Session",
        author: {
          connect: { email: session?.user?.email || undefined },
        },
      },
    });
  }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      const userSessions = await prisma.chatSession.findUnique({
        where: { id },
        select: defaultChatSelect,
      });

      return userSessions;
    }),
  ask: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string().cuid().optional(),
        query: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { query, chatSessionId } = input;
      const { prisma, session } = ctx;
      const recommendationListRegex = "/Recommendation list:/";
      const recommendationListIndex = mockdata.search(recommendationListRegex);

      const firstParagraph = mockdata.slice(0, recommendationListIndex).trim();
      console.log("First Paragraph:", firstParagraph);

      const idRegex = /(tt\d{7})/g;
      const ids = mockdata.match(idRegex)?.map((id) => id);
      console.log("apikey", env.DEV_IMDB_KEY);

      const data = await Promise.allSettled(
        ids?.map(async (id) => {
          const result = await fetch(
            `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${env.DEV_IMDB_KEY}`
          );

          return result.json();
        }) || []
      );

      const fullData = data
        .filter((result) => result.status === "fulfilled")
        .map(
          (result) => (result as PromiseFulfilledResult<JSON>).value
        ) as Array<any>;

      console.log("data", data);

      if (!chatSessionId) {
        const chatSession = await prisma.chatSession.create({
          data: {
            name: "Chat Session",
            author: {
              connect: { email: session?.user?.email || undefined },
            },
          },
        });
        const record = await prisma.chatRecord.create({
          data: {
            paragraph: firstParagraph,
            ids,
            fullData,
            chatSession: { connect: { id: chatSession.id } },
          },
          select: defaultChatRecordSelect,
        });
        return record;
      } else {
        const record = await prisma.chatRecord.create({
          data: {
            paragraph: firstParagraph,
            ids,
            fullData,
            chatSession: { connect: { id: chatSessionId } },
          },
          select: defaultChatRecordSelect,
        });
        return record;
      }
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
