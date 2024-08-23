import { SetSingleSelectedTreeItemAction } from "../actions/tree/tree-actions-type"

const initialState = () => {
    return {
        single_selected_tree_item: {},
    }
}
function SingleSelectedTreeItemReducer (state:any = initialState(), action:any) {
    switch(action.type) {
        case SetSingleSelectedTreeItemAction:
            let list = {...state.single_selected_tree_item};
            list[action.tree_name] = action.payload
            return {
                single_selected_tree_item:{...list}
            };
        default:
            return {...state}
    }
}

export default SingleSelectedTreeItemReducer;