import { SetHomePageSettings } from "../actions/home-page-setting-actions";

const initialState = () => {
    return {
        homePageSetting: {},
    }
}
function HomePageSettingReducer (state:any = initialState(), action:any) {
    switch(action.type) {
        case SetHomePageSettings:
            return {
                homePageSetting: action.payload
            };
        default:
            return {...state}
    }
}

export default HomePageSettingReducer;