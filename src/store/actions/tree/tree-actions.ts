import { SetSingleSelectedTreeItemAction } from "./tree-actions-type"

export const setSingleSelectedTreeItemAction = (payload:any, tree_name:string) => {
    return {
        tree_name,
        payload,
        type:SetSingleSelectedTreeItemAction
    }
} 