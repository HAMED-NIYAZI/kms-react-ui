
import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import SingleSelectedTreeItemReducer from './single-selected-tree-item-reducer';



export default combineReducers({
    userState: UserReducer,
    singleSelectedTreeItemState:SingleSelectedTreeItemReducer
})