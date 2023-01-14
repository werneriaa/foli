import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "./components/Layout";
import { SearchInput } from "./components/SearchInput";

const Home: NextPage = () => {
  return (
    <Layout>
      <SearchInput placeholder="Hae pysäkkiä numerolla tai osoitteella" />
    </Layout>
  );
};

export default Home;
