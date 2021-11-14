import {FetchService} from "./FetchService";
import {SessionStorageResponse, UserInfoStorageService} from "./UserInfoStorageService";

export type JwtResponse = {
    token: string;
    type: string;
    username: string;
    roles: string[];
}

export type AuthLoginInfo = {
    username: string;
    password: string;
}

export type SignUpInfo = {
    username: string;
    password: string;
    role?: string;
}

export class AuthService {
    public AuthService () { }

    static auth = async (): Promise<SessionStorageResponse> => {
        const jwtToken = UserInfoStorageService.getUserInfo()

        return jwtToken
    }

    static register = async (signUpInfo: SignUpInfo): Promise<JwtResponse> => {
        const { data } = await FetchService.post<JwtResponse>('/api/auth/signup', signUpInfo)
        UserInfoStorageService.saveUserInfo(data)

        return data
    }

    static login = async (authLoginInfo: AuthLoginInfo): Promise<JwtResponse> => {
        const { data } = await FetchService.post<JwtResponse>('/api/auth/signin', authLoginInfo)
        UserInfoStorageService.saveUserInfo(data)

        return data
    }

    static logout = async (): Promise<void> => {
        UserInfoStorageService.clearUserInfo()
    }
}