import { FunctionComponent, } from 'react'
import { DocumentProps, Head, Html, Main, NextScript, } from 'next/document'
import Script from 'next/script'

const Document: FunctionComponent = () => {
  return (
    <Html>
      <Head>
        <meta charSet={'UTF-8'} />
        <meta name={'description'} content={'Silly game in which you have to use colors to win.'} />
        <meta name={'keywords'} content={'game, typescript'} />
        <meta name={'author'} content={'Diego Rodríguez'} />
        <meta name={'copyright'} content={'Diego Rodríguez'} />

        <link rel={'shortcut icon'} href={'/favicon.ico'} type={'image/x-icon'} />

        <link rel={'preconnect'} href={'https://fonts.gstatic.com'} />
        <link href={'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'} rel={'stylesheet'} />

        <Script strategy={'lazyOnload'} src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <Script id={'google-analytics'} strategy={'afterInteractive'}>
          {`window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS}');`}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document