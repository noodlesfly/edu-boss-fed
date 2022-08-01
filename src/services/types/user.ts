export interface ReqLogin {
    phone: string,
    password: string,

}

export interface ResLogin {
    state: number,
    message: string,
    content: string,
    success: boolean
}
export interface User {
    isUpdatedPassword: boolean,
    portrait?: string,
    userName?: string
}
export interface ResUserInfo {
    state: number,
    message: string,
    content: User,
    success: boolean
}

export interface ResLogout {
    state: number,
    message: string,
    content: object,
    success: boolean
}
