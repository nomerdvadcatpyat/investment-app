import {observer} from "mobx-react";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react";
import {Layout, Menu} from "antd";
import {
    HomeOutlined, LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    TableOutlined
} from "@ant-design/icons";
import Link from "next/link";
import {ClassIcon} from "../icons/ClassIcon";
import {EmployeesIcon} from "../icons/EmployeesIcon";
import {StudentIcon} from "../icons/StudentIcon";
import {ParentsIcon} from "../icons/ParentsIcon";
import {BookIcon} from "../icons/BookIcon";
import {TimeTableIcon} from "../icons/TimeTableIcon";
import {useAuth} from "../../../store/authStore";
import {MENU_ITEMS, queryToMenuItem} from "../../../utils/menuHelpers";

const { Sider } = Layout;

export const AppSider = observer(() => {
    const authStore = useAuth()
    const role = authStore.role
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(true)

    const handleLogout = useCallback(async () => {
        setCollapsed(true)
        await authStore.logout()
        await router.push('/')
    }, [])

    const handleLogin = useCallback(async ()  => {
        setCollapsed(true)
        await router.push('/auth/login')
    }, [])

    return (
        <>
            <div
                style={{
                    display: collapsed ? 'none' : 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    zIndex: 999
                }}
                onClick={() => setCollapsed(true)}
            />
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={300}
                theme={'light'}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 1000
                }}
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
                                {/*<Menu.Item key={MENU_ITEMS.USER} onClick={() => setCollapsed(true)} icon={<UserProfileIcon/>}>*/}
                                {/*    <Link href={`/${MENU_ITEMS.USER}`}>*/}
                                {/*        Профиль пользователя*/}
                                {/*    </Link>*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item key={MENU_ITEMS.CLASS} onClick={() => setCollapsed(true)} icon={<ClassIcon/>}>
                                    <Link href={`/${MENU_ITEMS.CLASS}`}>
                                        Классы
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={MENU_ITEMS.EMPLOYEE} onClick={() => setCollapsed(true)} icon={<EmployeesIcon/>}>
                                    <Link href={`/${MENU_ITEMS.EMPLOYEE}`}>
                                        Сотрудники
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={MENU_ITEMS.STUDENTS} onClick={() => setCollapsed(true)} icon={<StudentIcon/>}>
                                    <Link href={`/${MENU_ITEMS.STUDENTS}`}>
                                        Ученики
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={MENU_ITEMS.PARENTS} onClick={() => setCollapsed(true)} icon={<ParentsIcon/>}>
                                    <Link href={`/${MENU_ITEMS.PARENTS}`}>
                                        Родители
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={MENU_ITEMS.SUBJECTS} onClick={() => setCollapsed(true)} icon={<BookIcon />}>
                                    <Link href={`/${MENU_ITEMS.SUBJECTS}`}>
                                        Учебные предметы
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={MENU_ITEMS.TIMETABLE} onClick={() => setCollapsed(true)} icon={<TimeTableIcon />}>
                                    <Link href={`/${MENU_ITEMS.TIMETABLE}`}>
                                        Расписание занятий
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={MENU_ITEMS.JOURNAL} onClick={() => setCollapsed(true)} icon={<ReadOutlined/>}>
                                    <Link href={`/${MENU_ITEMS.JOURNAL}`}>
                                        Классные журналы
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
