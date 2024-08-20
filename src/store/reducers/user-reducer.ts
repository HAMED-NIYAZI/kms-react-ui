import { SetUser, GetUser, SetExpiresAt, GetExpiresAt, SetToken, GetToken, CheckLoginType, Logout } from "../actions/user-action-type";


const initialState = () => {
    let user:any = localStorage.getItem('user')
    let expires_at = Number(localStorage.getItem('expires_at'))
    let api_token = localStorage.getItem('api_token')

    return {
        user: JSON.parse(user),
        expires_at,
        api_token,
        checkLogin:!!(api_token && expires_at && expires_at > Math.floor(Date.now() / 1000))
    }
}
function UserReducer (state:any = initialState(), action:any) {
    switch(action.type) {
        case SetUser:
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {
                ...state,
                checkLogin:true,
                user:{...action.payload}
            };
        case GetUser:
            return state.user
        case SetExpiresAt:
            localStorage.setItem('expires_at', action.payload)
            return {
                ...state,
                expires_at:action.payload
            };
        case GetExpiresAt:
            return state.expires_at;
        case SetToken:
            localStorage.setItem('api_token', action.payload)
            return {
                ...state,
                api_token:action.payload
            };
        case GetToken:
            return state.api_token;
        case CheckLoginType:
            return state.checkLogin;
        case Logout:
            localStorage.removeItem('user')
            localStorage.removeItem('expires_at')
            localStorage.removeItem('api_token')
            return {
                user:'',
                expires_at:'',
                api_token:'',
                checkLogin:false
            }
        default:
           return {...state};
    }
}

export default UserReducer;