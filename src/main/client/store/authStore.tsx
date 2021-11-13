import {makeAutoObservable} from "mobx";
import {AuthLoginInfo, AuthService, SignUpInfo} from "../services/AuthService";
import {createContext, FC, useContext} from "react";

export default class AuthStore {
    token: string | null = null
    role: string | null = null

    error: string | null = null
    loading: boolean = true

    constructor () {
        makeAutoObservable(this)
    }

    async auth () {
        try {
            this.loading = true

            const userInfo = await AuthService.auth()

            if (userInfo && userInfo.token) {
                this.token = userInfo.token
            }

            // if (error) this.error = error
            // else if (!userId) this.user = null
            // else {
            //     this.error = null
            //     this.user = {
            //         userId,
            //         roles
            //     }
            // }
        } finally {
            this.loading = false
        }
    }

    async login (username: string, password: string) {
        try {
            this.loading = true

            const authLoginInfo: AuthLoginInfo = { username, password }
            const { token } = await AuthService.login(authLoginInfo)

            if (token) {
                this.token = token
            }

            // if (error) this.error = error
            // else {
            //     this.error = null
            //     this.user = {
            //         userId,
            //         roles
            //     }
            // }
        } finally {
            this.loading = false
        }
    }

    async register (username: string, password: string) {
        try {
            this.loading = true

            const signUpInfo: SignUpInfo = { username, password }
            const { token } = await AuthService.register(signUpInfo)

            if (token) {
                this.token = token
            }

            // if (error) this.error = error
            // else {
            //     this.error = null
            //     this.user = {
            //         userId,
            //         roles
            //     }
            // }
        } finally {
            this.loading = false
        }
    }

    async logout () {
        try {
            this.loading = true

            await AuthService.logout()

            this.token = null
            this.role = null

            // if (error) this.error = error
            // else {
            //     this.error = null
            //     this.user = null
            // }
        } finally {
            this.loading = false
        }
    }
}

const AuthContext = createContext<AuthStore>(new AuthStore())

export const AuthProvider: FC<{store: AuthStore}> = ({ store, children }) => {
    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)