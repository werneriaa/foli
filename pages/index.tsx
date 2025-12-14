import type { NextPage, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { SearchInput } from "../components/SearchInput";
import { Suggestions } from "../components/Suggestions";
import { useRouter } from "next/router";
import { SelectedStop } from "../components/SelectedStop";
import { retrieveStops } from "../functions/server";
import { InfoBox } from "../components/InfoBox";

interface Home {
  stops: Foli.Stop;
}

const Home: NextPage<Home> = ({ stops }) => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Foli.Stop>({});
  const [selectedStop, setSelectedStop] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (router.query?.stop) {
      setSelectedStop(router?.query.stop.toString());
    }
  }, [router.query]);

  const onStopSelect = (key: string) => {
    setSuggestions({});
    setSelectedStop(key);
    router.query.stop = key;
    router.push({ query: { stop: key } });
  };

  return (
    <Layout>
      <SearchInput
        stops={stops}
        placeholder="Hae pysäkkiä numerolla tai osoitteella"
        setSuggestions={setSuggestions}
        setSelectedStop={setSelectedStop}
      />
      {!selectedStop && Object.keys(suggestions).length < 1 && <InfoBox />}
      {selectedStop ? (
        <SelectedStop
          selectedStop={selectedStop}
          stop_name={stops[selectedStop]?.stop_name}
        />
      ) : (
        <Suggestions suggestions={suggestions} onClick={onStopSelect} />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Home> = async () => {
  const stops = await retrieveStops();

  return {
    props: {
      stops: stops,
    },
    revalidate: 120,
  };
};

export default Home;
