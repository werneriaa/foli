import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DarkModeProvider } from "../hooks/useDarkMode";
import { FavoritesProvider } from "../hooks/useFavorites";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000, // 10 seconds
            refetchOnWindowFocus: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <FavoritesProvider>
          <Component {...pageProps} />
        </FavoritesProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
