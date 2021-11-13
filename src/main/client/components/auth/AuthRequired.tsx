import {observer} from "mobx-react"
import {ReactElement, useEffect} from "react"
import {useRouter} from 'next/router'
import {useAuth} from "../../store/authStore";

type IAuthRequiredProps = {
    children: ReactElement
}

export const AuthRequired = observer(({ children }: IAuthRequiredProps) => {
    const router = useRouter()
    const authStore = useAuth()

    useEffect(() => {
        if (!authStore.token && !authStore.loading && !authStore.error) {
            router.push('/auth/login')
        }
    }, [authStore.loading, authStore.token, authStore.error])

    return children
})

type IRoleRequiredProps = {
    children: React.ReactElement,
    role: string
}

export const RoleRequired = observer(({ children, role }: IRoleRequiredProps) => {
    const router = useRouter()
    const authStore = useAuth()

    if (authStore?.role !== role) {
        return <></>
    }

    return children
})