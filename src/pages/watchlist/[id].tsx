import { Center, Container, rem } from "@mantine/core";

import { type NextPageWithLayout } from "../_app";
import ChatBox from "@/components/Chat/ChatBox";
import { useRouter } from "next/router";
import RecommendationCarousel from "@/components/Chat/Recommendations/RecommendationCarousel";
const fullData = [
  {
    id: 263115,
    adult: false,
    title: "Logan",
    video: false,
    overview:
      "In the near future, a weary Logan cares for an ailing Professor X in a hideout on the Mexican border. But Logan's attempts to hide from the world and his legacy are upended when a young mutant arrives, pursued by dark forces.",
    genre_ids: [28, 18, 878],
    media_type: "movie",
    popularity: 52.751,
    vote_count: 17773,
    poster_path: "/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg",
    release_date: "2017-02-28",
    vote_average: 7.815,
    backdrop_path: "/9X7YweCJw3q8Mcf6GadxReFEksM.jpg",
    original_title: "Logan",
    original_language: "en",
  },
  {
    id: 64690,
    adult: false,
    title: "Drive",
    video: false,
    overview:
      "Driver is a skilled Hollywood stuntman who moonlights as a getaway driver for criminals. Though he projects an icy exterior, lately he's been warming up to a pretty neighbor named Irene and her young son, Benicio. When Irene's husband gets out of jail, he enlists Driver's help in a million-dollar heist. The job goes horribly wrong, and Driver must risk his life to protect Irene and Benicio from the vengeful masterminds behind the robbery.",
    genre_ids: [18, 53, 80],
    media_type: "movie",
    popularity: 42.822,
    vote_count: 11385,
    poster_path: "/602vevIURmpDfzbnv5Ubi6wIkQm.jpg",
    release_date: "2011-09-15",
    vote_average: 7.567,
    backdrop_path: "/uslmOwQpdRRUwr6AmBP6JdzeHjS.jpg",
    original_title: "Drive",
    original_language: "en",
  },
  {
    id: 335984,
    adult: false,
    title: "Blade Runner 2049",
    video: false,
    overview:
      "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
    genre_ids: [878, 18],
    media_type: "movie",
    popularity: 72.596,
    vote_count: 11885,
    poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    release_date: "2017-10-04",
    vote_average: 7.534,
    backdrop_path: "/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
    original_title: "Blade Runner 2049",
    original_language: "en",
  },
  {
    id: 42009,
    name: "Black Mirror",
    adult: false,
    overview:
      "A contemporary British re-working of The Twilight Zone with stories that tap into the collective unease about our modern world. \n\nOver the last ten years, technology has transformed almost every aspect of our lives before we've had time to stop and question it. In every home; on every desk; in every palm - a plasma screen; a monitor; a smartphone - a black mirror of our 21st Century existence.",
    genre_ids: [10765, 18, 9648],
    media_type: "tv",
    popularity: 123.015,
    vote_count: 4027,
    poster_path: "/5UaYsGZOFhjFDwQh6GuLjjA1WlF.jpg",
    vote_average: 8.315,
    backdrop_path: "/xpdw7ogSIMH1Wmnbx4irH3wimFP.jpg",
    original_name: "Black Mirror",
    first_air_date: "2011-12-04",
    origin_country: ["GB"],
    original_language: "en",
  },
  {
    id: 1124,
    adult: false,
    title: "The Prestige",
    video: false,
    overview:
      "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.",
    genre_ids: [18, 9648, 878],
    media_type: "movie",
    popularity: 40.672,
    vote_count: 14201,
    poster_path: "/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    release_date: "2006-10-19",
    vote_average: 8.201,
    backdrop_path: "/mfJepkInUbiZ0mFXFhDNz8ko6Zr.jpg",
    original_title: "The Prestige",
    original_language: "en",
  },
  {
    id: 46648,
    name: "True Detective",
    adult: false,
    overview:
      "An American anthology police detective series utilizing multiple timelines in which investigations seem to unearth personal and professional secrets of those involved, both within or outside the law.",
    genre_ids: [18],
    media_type: "tv",
    popularity: 65.463,
    vote_count: 2638,
    poster_path: "/aowr4xpLP5sRCL50TkuADomJ98T.jpg",
    vote_average: 8.291,
    backdrop_path: "/scx72FpTF929jYXea0MphyE24Wa.jpg",
    original_name: "True Detective",
    first_air_date: "2014-01-12",
    origin_country: ["US"],
    original_language: "en",
  },
  {
    id: 629,
    adult: false,
    title: "The Usual Suspects",
    video: false,
    overview:
      "Held in an L.A. interrogation room, Verbal Kint attempts to convince the feds that a mythic crime lord, Keyser Soze, not only exists, but was also responsible for drawing him and his four partners into a multi-million dollar heist that ended with an explosion in San Pedro harbor – leaving few survivors. Verbal lures his interrogators with an incredible story of the crime lord's almost supernatural prowess.",
    genre_ids: [18, 80, 53],
    media_type: "movie",
    popularity: 29.605,
    vote_count: 9359,
    poster_path: "/bUPmtQzrRhzqYySeiMpv7GurAfm.jpg",
    release_date: "1995-07-19",
    vote_average: 8.198,
    backdrop_path: "/7S7PE3vK9Eh5uzCYBDGk5qTJeYW.jpg",
    original_title: "The Usual Suspects",
    original_language: "en",
  },
  {
    id: 76341,
    adult: false,
    title: "Mad Max: Fury Road",
    video: false,
    overview:
      "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
    genre_ids: [28, 12, 878],
    media_type: "movie",
    popularity: 61.665,
    vote_count: 20552,
    poster_path: "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    release_date: "2015-05-13",
    vote_average: 7.6,
    backdrop_path: "/8yACFuo4OaIiKr9hHFlmPcGalKx.jpg",
    original_title: "Mad Max: Fury Road",
    original_language: "en",
  },
  {
    id: 79788,
    name: "Watchmen",
    adult: false,
    overview:
      "Set in an alternate history where “superheroes” are treated as outlaws, “Watchmen” embraces the nostalgia of the original groundbreaking graphic novel while attempting to break new ground of its own.",
    genre_ids: [80, 18, 10759, 10765],
    media_type: "tv",
    popularity: 28.92,
    vote_count: 1129,
    poster_path: "/m8rWq3j73ZGhDuSCZWMMoE9ePH1.jpg",
    vote_average: 7.727,
    backdrop_path: "/aUmRdiriC7rDAPNVWiuIZ54hxAy.jpg",
    original_name: "Watchmen",
    first_air_date: "2019-10-20",
    origin_country: ["US"],
    original_language: "en",
  },
  {
    id: 2501,
    adult: false,
    title: "The Bourne Identity",
    video: false,
    overview:
      "Wounded to the brink of death and suffering from amnesia, Jason Bourne is rescued at sea by a fisherman. With nothing to go on but a Swiss bank account number, he starts to reconstruct his life, but finds that many people he encounters want him dead. However, Bourne realizes that he has the combat and mental skills of a world-class spy—but who does he work for?",
    genre_ids: [28, 18, 9648, 53],
    media_type: "movie",
    popularity: 38.795,
    vote_count: 8376,
    poster_path: "/aP8swke3gmowbkfZ6lmNidu0y9p.jpg",
    release_date: "2002-06-14",
    vote_average: 7.454,
    backdrop_path: "/uSkcH2bcDBkUZCZMPcLSzaMY0td.jpg",
    original_title: "The Bourne Identity",
    original_language: "en",
  },
];

const ChatPage: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Container size="md">
      <Center h={`calc(100vh - ${rem(60)})`}>
        {/* <ChatBox id={router.query.id as string} /> */}
        {router.query.id}
        <RecommendationCarousel items={fullData} />
      </Center>
    </Container>
  );
};

export default ChatPage;
