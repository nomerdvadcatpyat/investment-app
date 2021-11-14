import {observer} from "mobx-react";
import {useRouter} from "next/router";
import React, {CSSProperties, useCallback, useMemo, useState} from "react";
import {Layout, Menu} from "antd";
import {
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {EmployeesIcon} from "../icons/EmployeesIcon";
import {useAuth} from "../../../store/authStore";
import {MENU_ITEMS, queryToMenuItem} from "../../../utils/menuHelpers";
import {UserProfileIcon} from "../icons/UserProfileIcon";
import {INDEX_PAGE} from "../../../constants/common";

const { Sider } = Layout;

const SIDER_STYLE: CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    zIndex: 1000
}

export const AppSider = observer(() => {
    const authStore = useAuth()
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(true)

    const handleLogout = useCallback(async () => {
        setCollapsed(true)
        await authStore.logout()
        await router.push(INDEX_PAGE)
    }, [])

    const handleLogin = useCallback(async ()  => {
        setCollapsed(true)
        await router.push('/auth/login')
    }, [])

    const collapseSider = () => setCollapsed(true)

    const overlayStyle: CSSProperties = useMemo(() => ({
        display: collapsed ? 'none' : 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        zIndex: 999
    }), [collapsed])

    return (
        <>
            <div
                style={overlayStyle}
                onClick={() => setCollapsed(true)}
            />
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={300}
                theme={'light'}
                style={SIDER_STYLE}
            >
                <Menu mode="inline" selectedKeys={[...queryToMenuItem()]}>
                    <div
                        key="0"
                        onClick={() => setCollapsed(prev => !prev)}
                        className='trigger'
                    >
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </div>
                    {
                        authStore.token ? (
                            <>
                                <Menu.Item key={MENU_ITEMS.USER} onClick={collapseSider} icon={<UserProfileIcon/>}>
                                    <Link href={`/${MENU_ITEMS.USER}/${authStore.username}`}>
                                        Профиль пользователя
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={MENU_ITEMS.EXCHANGE} onClick={collapseSider} icon={<EmployeesIcon/>}>
                                    <Link href={`/${MENU_ITEMS.EXCHANGE}`}>
                                        Биржа
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="logout" icon={<LogoutOutlined/>} onClick={handleLogout}>
                                    Выйти
                                </Menu.Item>
                            </>

                        ) : (
                            <Menu.Item key="login" icon={<LoginOutlined/>} onClick={handleLogin}>
                                Войти
                            </Menu.Item>
                        )
                    }
                </Menu>
            </Sider>
        </>
    )
})
