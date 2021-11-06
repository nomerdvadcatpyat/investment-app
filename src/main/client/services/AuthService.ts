import {IAuthedItem, IErrorStatusResponse} from "../schema";
import {api} from "../axios";

export class AuthService {
    static auth = async (): Promise<IAuthedItem & IErrorStatusResponse> => {
        const { data } = await api.post<IAuthedItem & IErrorStatusResponse>('/api/auth/auth', {})
        console.log('data', data)
        return data
    }

    static register = async (email: string, password: string): Promise<IAuthedItem & IErrorStatusResponse> => {
        const { data } = await api.post<IAuthedItem & IErrorStatusResponse>('/api/auth/register', { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log('data', data)

        return data
    }

    static login = async (email: string, password: string): Promise<IAuthedItem & IErrorStatusResponse> => {
        const { data } = await api.post<IAuthedItem & IErrorStatusResponse>('/api/auth/login', { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return data
    }

    static logout = async (): Promise<IErrorStatusResponse> => {
        const { data } = await api.post<IErrorStatusResponse>('/api/auth/logout')

        return data
    }
}