import {useRouter} from "next/router";

export enum MENU_ITEMS {
    USER = 'user',
    EXCHANGE = 'exchange',
}

export const queryToMenuItem = () => {
    const router = useRouter()
    const pathname = router.pathname
    return Object.values(MENU_ITEMS).filter(menuItem => pathname.includes(menuItem))
}