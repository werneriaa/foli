import type { NextPage, GetStaticProps } from "next";
import { useState } from "react";
import { getStops } from "../functions/client";
import { Layout } from "../components/Layout";
import { SearchInput } from "../components/SearchInput";
import { Suggestions } from "../components/Suggestions";

interface Home {
  stops: Foli.Stop;
}

const Home: NextPage<Home> = ({ stops }) => {
  const [suggestions, setSuggestions] = useState<Foli.Stop>({});

  return (
    <Layout>
      <SearchInput
        stops={stops}
        placeholder="Hae pysäkkiä numerolla tai osoitteella"
        setSuggestions={setSuggestions}
      />
      <Suggestions suggestions={suggestions} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Home> = async () => {
  const stops = await getStops();

  return {
    props: {
      stops: stops,
    },
    revalidate: 120,
  };
};

export default Home;
