import { useSession } from "next-auth/react";
import { type NextPageWithLayout } from "./_app";
import Hero from "@/components/LandingPage/Hero";
import { Container } from "@mantine/core";
import { HeroLayout } from "@/components/LandingPage/HeroLayout";

const IndexPage: NextPageWithLayout = () => {
  const { data: session, status } = useSession();

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <Container fluid>
      {/* <Header /> */}
      {/* <Header /> */}
      <Container size="md">
        <Hero />
      </Container>
    </Container>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };

IndexPage.getLayout = function getLayout(page) {
  return <HeroLayout>{page}</HeroLayout>;
};
