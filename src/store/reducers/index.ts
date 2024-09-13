
import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import SingleSelectedTreeItemReducer from './single-selected-tree-item-reducer';
import HomePageSettingReducer from './home-page-setting-reducer';


export default combineReducers({
    userState: UserReducer,
    singleSelectedTreeItemState:SingleSelectedTreeItemReducer,
    homePageSettingState:HomePageSettingReducer
})