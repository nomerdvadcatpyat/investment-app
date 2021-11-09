import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import { SWRConfig } from "swr";
import 'antd/dist/antd.css';
import './index.css';
import {Layout} from 'antd';
import React, {FC, useEffect} from "react";
import {observer} from "mobx-react";
import {Router} from "next/router";
import AuthStore, {AuthProvider, useAuth} from "../store/authStore";
import {AppSider} from "../components/common/layout/Sider";
import {MainLoader} from "../components/common/Loader";
import {fetcher} from "../fetch";

const { Content } = Layout;
const store = new AuthStore()

const AppContent: FC<any> = observer(({Component, pageProps}) => {
    const authStore = useAuth()
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        const start = () => {
            setLoading(true)
        }
        const end = () => {
            setLoading(false)
        }
        Router.events.on("routeChangeStart", start)
        Router.events.on("routeChangeComplete", end)
        Router.events.on("routeChangeError", end)
        return () => {
            Router.events.off("routeChangeStart", start)
            Router.events.off("routeChangeComplete", end)
            Router.events.off("routeChangeError", end)
        }
    }, [])

    // useEffect(() => {
    //     if (!authStore.user) {
    //         authStore.auth()
    //     }
    // }, [])

    return (
        <Layout hasSider={true} className={'layout'}>
            <AppSider/>
            {
                loading ? <MainLoader /> : (
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: '24px 24px 24px 80px',
                            minHeight: 280,
                        }}
                    >
                        <Component {...pageProps} />
                    </Content>
                )
            }
        </Layout>
    )
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SWRConfig value={{ fetcher }}>
          <AuthProvider store={store}>
              <AppContent Component={Component} pageProps={pageProps}/>
          </AuthProvider>
      </SWRConfig>
  )
}

export default MyApp
