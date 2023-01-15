import Head from "next/head";
import { ReactNode } from "react";
import { Header } from "./Header";

interface Layout {
  children: ReactNode | undefined;
}

export const Layout: React.FC<Layout> = ({ children }) => {
  return (
    <div id="layout" className="flex min-h-screen flex-col">
      <Head>
        <title>Föli pysäkkiopas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="w-full h-full px-4 sm:py-12 py-6">
        <main className="mx-auto flex w-full max-w-6xl grow flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};
