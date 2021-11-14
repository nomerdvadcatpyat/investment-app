import {JwtResponse} from "./AuthService";

const USER_INFO = 'UserInfo';

export type SessionStorageResponse = JwtResponse | null

export class UserInfoStorageService {
    constructor () { }

    public static saveUserInfo (userInfo: JwtResponse) {
        window.sessionStorage.removeItem(USER_INFO);
        window.sessionStorage.setItem(USER_INFO, JSON.stringify(userInfo));
    }

    public static getUserInfo (): SessionStorageResponse {
        const userInfo = sessionStorage.getItem(USER_INFO)

        if (!userInfo) return null

        return JSON.parse(userInfo)
    }

    public static clearUserInfo () {
        window.sessionStorage.removeItem(USER_INFO);
    }
}
