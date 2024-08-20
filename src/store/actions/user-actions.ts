import { GetUser, SetUser, SetToken, GetToken, SetExpiresAt, GetExpiresAt, CheckLoginType, Logout } from "./user-action-type";

export const getUser = () =>  ({
    type:GetUser,
})
export const setUser = (payload:any) =>  ({
    type:SetUser,
    payload
})

export const getToken = () =>  ({
    type:GetToken,
})

export const setToken = (payload:string) =>  ({
    type:SetToken,
    payload
})

export const getExpiresAt = () =>  ({
    type:GetExpiresAt,
})

export const setExpiresAt = (payload:number) =>  ({
    type:SetExpiresAt,
    payload
})
export const checkLoginAction = () =>  ({
    type:CheckLoginType
})
export const logoutAction = () =>  ({
    type:Logout
})