import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { Environment, WidgetsProvider } from '@sitecore-discover/react'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <WidgetsProvider
      env={process.env.NEXT_PUBLIC_DISCOVER_APP_ENV as Environment}
      customerKey={process.env.NEXT_PUBLIC_DISCOVER_APP_CUSTOMER_KEY}
      apiKey={process.env.NEXT_PUBLIC_DISCOVER_APP_API_KEY}
      useToken
    >
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </WidgetsProvider>
  )
}
