import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import { SWRConfig } from "swr";

const SERVER_URL = process.env.SERVER_URL || ''
const fetcher = (url: string) => fetch(`${SERVER_URL}${url}`).then(response => response.json())

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
  )
}

export default MyApp
