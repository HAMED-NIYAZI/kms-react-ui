import { SetHomePageSettings } from "../actions/home-page-setting-actions";

const initialState = () => {
    let homePageSetting:any = localStorage.getItem('homePageSetting')

    return {
        homePageSetting: homePageSetting ? JSON.parse(homePageSetting) : '',
    }
}

function HomePageSettingReducer (state:any = initialState(), action:any) {
    switch(action.type) {
        case SetHomePageSettings:
            localStorage.setItem('homePageSetting', JSON.stringify(action.payload))
            return {
                ...state,
                homePageSetting: action.payload
            };
        default:
            return {...state}
    }
}

export default HomePageSettingReducer;