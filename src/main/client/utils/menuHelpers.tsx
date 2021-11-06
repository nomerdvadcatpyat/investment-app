import {useRouter} from "next/router";

export enum MENU_ITEMS {
    NEWS = 'news',
    USER = 'user',
    CLASS = 'class',
    EMPLOYEE = 'employee',
    STUDENTS = 'student',
    SUBJECTS = 'subject',
    PARENTS = 'parent',
    TIMETABLE = 'timetable',
    JOURNAL = 'journal'
}

export const queryToMenuItem = () => {
    const router = useRouter()
    const pathname = router.pathname
    return Object.values(MENU_ITEMS).filter(menuItem => pathname.includes(menuItem))
}