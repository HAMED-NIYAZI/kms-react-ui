import { GetUser, SetUser, SetToken, GetToken, SetExpiresAt, GetExpiresAt } from "./user-action-type";

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

export const setExpiresAt = (payload:string) =>  ({
    type:SetExpiresAt,
    payload
})