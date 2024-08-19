import { SetUser, GetUser,SetExpiresAt, GetExpiresAt, SetToken, GetToken } from "../actions/user-action-type";

let s:any = localStorage.getItem('user')
const initialState:any = {
    user: JSON.parse(s),
    expires_at:'',
    api_token:''
}
function UserReducer (state:any = initialState, action:any) {
    switch(action.type) {
        case SetUser:
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {
                ...state,
                user:{...action.payload}
            };
        case GetUser:
            return state.user
        case SetExpiresAt:
            return {
                ...state,
                expires_at:action.payload
            };
        case GetExpiresAt:
            return state.expires_at;
        case SetToken:
            return {
                ...state,
                api_token:action.payload
            };
        case GetToken:
            return state.api_token;
        default:
           return {...state};
    }
}

export default UserReducer;