import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>MyShowList</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <div className='w-full flex grow mx-auto md:max-w-7xl lg:max-w-content py-5'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </QueryClientProvider>
    </>
  )
}
