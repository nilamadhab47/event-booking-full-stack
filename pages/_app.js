import '../styles/globals.css';
import Head from "next/head"
import {SessionProvider} from "next-auth/react"

export default function MyApp({
                                  Component,
                                  pageProps: {session, ...pageProps},
                              }) {

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="preload"
                      as="style" onload="this.rel='stylesheet'"
                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                      crossOrigin="anonymous"
                />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                     rel="preload"
                     as="style" onload="this.rel='stylesheet'"/>
                {/* <meta name="robots" content="nofollow" /> */}
                {/* <meta name="googlebot" content="noindex" /> */}
            </Head>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    )
}