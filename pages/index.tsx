import type { NextPage, GetStaticProps } from "next";
import { useState } from "react";
import { getStops } from "../functions/client";
import { Layout } from "./components/Layout";
import { SearchInput } from "./components/SearchInput";

interface Home {
  stops: Foli.Stop;
}

const Home: NextPage<Home> = ({ stops }) => {
  const [suggestions, setSuggestions] = useState<Foli.Stop>({});

  console.log(suggestions);

  return (
    <Layout>
      <SearchInput
        stops={stops}
        placeholder="Hae pysäkkiä numerolla tai osoitteella"
        setSuggestions={setSuggestions}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Home> = async () => {
  const stops = await getStops();

  return {
    props: {
      stops: stops,
    },
  };
};

export default Home;
