import {observer} from "mobx-react"
import {ReactElement, useEffect} from "react"
import {useRouter} from 'next/router'
import {UserRoles} from "../../schema";
import {useAuth} from "../../store/authStore";

type IAuthRequiredProps = {
    children: ReactElement
}

export const AuthRequired = observer(({ children }: IAuthRequiredProps) => {
    const router = useRouter()
    const authStore = useAuth()

    useEffect(() => {
        if (!authStore.user && !authStore.loading && !authStore.error) {
            router.push('/auth/login')
        }
    }, [authStore.loading, authStore.user, authStore.error])

    return children
})

type IRoleRequiredProps = {
    children: React.ReactElement,
    role: UserRoles
}

export const RoleRequired = observer(({ children, role }: IRoleRequiredProps) => {
    const router = useRouter()
    const authStore = useAuth()

    if (!authStore.user?.roles?.includes(role)) {
        return <></>
    }

    return children
})