import TreeSingleSelect from "../Tree/TreeSingleSelect";
import { connect } from "react-redux";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";

function SingleSelectTreeComponent({
  tree_name,
  tree_caption,
  tree_data,
  treeSingleSelectValue,
  setTreeItem,
  onDelete,
  onReload,
}: {
  tree_name: string;
  tree_caption?: string;
  tree_data: any[];
  treeSingleSelectValue?: any;
  setTreeItem: any;
  onDelete?: (id: string, name: string) => void;
  onReload: () => void;
}) {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header pb-0" style={{paddingBottom:'15px'}}>
          <div className="d-flex justify-content-between">
            <h4
              className="card-title mg-b-0"
              style={{ paddingTop: "10px!important" }}
            >
              {tree_caption}
            </h4>
            <p>{treeSingleSelectValue[tree_name]?.persianTitle}</p>
            <div className="d-flex gap-1"></div>
           { (treeSingleSelectValue[tree_name]?.persianTitle && onDelete )&& (
            <a
              href="#"
              onClick={() => {
                if (onDelete) {
                  onDelete(
                    treeSingleSelectValue[tree_name].id,
                    treeSingleSelectValue[tree_name].persianTitle
                  );
                  setTreeItem(tree_name, "");
                }
              }}
              title="حذف "
            >
              <i className="fa fa-trash text-danger"></i>
            </a>
            )}
                          <a href="#" onClick={() => {onReload();
                           setTreeItem(tree_name, "");}} title="بروزرسانی">
                بروزرسانی
              </a>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              <div>
                <TreeSingleSelect trees={tree_data} tree_name={tree_name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: (p: any) => void) => {
  return {
    setTreeItem: (treeName: string, payload: any) =>
      dispatch(setSingleSelectedTreeItemAction(payload, treeName)),
  };
};
const mapStateToProps = (state: any) => {
  return {
    treeSingleSelectValue:
      state.singleSelectedTreeItemState.single_selected_tree_item,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSelectTreeComponent);
