import {makeAutoObservable} from "mobx";
import {AuthService} from "../services/AuthService";
import {createContext, FC, useContext} from "react";
import {IAuthedItem} from "../schema";

export default class AuthStore {
    user: IAuthedItem | null = null
    loading: boolean = true
    error: string | null = null

    constructor () {
        makeAutoObservable(this)
    }

    async auth () {
        try {
            this.loading = true
            const { userId, roles, error } = await AuthService.auth()

            if (error) this.error = error
            else if (!userId) this.user = null
            else {
                this.error = null
                this.user = {
                    userId,
                    roles
                }
            }
        } finally {
            this.loading = false
        }
    }

    async login (email: string, password: string) {
        try {
            this.loading = true
            const { userId, roles, error } = await AuthService.login(email, password)

            if (error) this.error = error
            else {
                this.error = null
                this.user = {
                    userId,
                    roles
                }
            }
        } finally {
            this.loading = false
        }
    }

    async register (email: string, password: string) {
        try {
            this.loading = true
            const { userId, roles, error } = await AuthService.register(email, password)

            if (error) this.error = error
            else {
                this.error = null
                this.user = {
                    userId,
                    roles
                }
            }
        } finally {
            this.loading = false
        }
    }

    async logout () {
        try {
            this.loading = true
            const { error } = await AuthService.logout()

            if (error) this.error = error
            else {
                this.error = null
                this.user = null
            }
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