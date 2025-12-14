import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DarkModeProvider } from '../hooks/useDarkMode'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
    </DarkModeProvider>
  )
}

export default MyApp
