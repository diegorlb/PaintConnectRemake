import { FunctionComponent, } from 'react'
import { AppProps, } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

const App: FunctionComponent<AppProps> = ({ Component, pageProps, }) => {
  return (
    <>
      <Head>
        <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'} />
        <meta name={'canonical'} content={'https://paint.diegorlb.com.ar/'} />

        <title>PaintConnect - Diego Rodríguez</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App