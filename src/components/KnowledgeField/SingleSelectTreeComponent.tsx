import { connect } from "react-redux";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import TreeSingle from "./TreeSingle";
import { ReactNode } from "react";

function SingleSelectTreeComponent({
  tree_name,
  tree_caption,
  tree_data,
  treeSingleSelectValue,
  setTreeItem,
  onDelete,
  onReload,
  onAdd,
  onEdit,
  onGetSingleSelectValue,
}: Readonly<{
  tree_name: string;
  tree_caption?: string;
  tree_data: any[];
  treeSingleSelectValue?: any;
  setTreeItem: any;
  onDelete?: (id: string, name: string) => void;
  onReload: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
  onGetSingleSelectValue: (id: string) => void;
}>) {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header pb-0" style={{ paddingBottom: "15px" }}>
          <div className="d-flex justify-content-between">
            <h4
              className="card-title mg-b-0"
              style={{ paddingTop: "10px!important" }}
            >
              {tree_caption}
              {treeSingleSelectValue[tree_name]?.persianTitle && (
                <span
                  className="badge badge-warning mx-3"
                  style={{ textTransform: "none", fontSize: "14px" }}
                >
                  {treeSingleSelectValue[tree_name]?.persianTitle}
                </span>
              )}
              <span style={{ display: "none" }}>
                {treeSingleSelectValue[tree_name]?.persianTitle != null &&
                  (onGetSingleSelectValue(
                    treeSingleSelectValue[tree_name].id
                  ) as ReactNode)}
              </span>
            </h4>
            <div className="d-flex gap-1">
              {treeSingleSelectValue[tree_name]?.persianTitle && onDelete && (
                <button
                  type="button"
                  className="btn btn-danger btn-icon"
                  id="m-l-c-05"
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
                  <i className="fa fa-trash"></i>
                </button>
              )}

              {treeSingleSelectValue[tree_name]?.persianTitle && onEdit && (
                <button
                  type="button"
                  className="btn btn-warning btn-icon"
                  style={{ marginLeft: "8px" }}
                  onClick={() => {
                    onEdit();
                  }}
                  title="ویرایش"
                >
                  <i className="mdi mdi-pencil"></i>
                </button>
              )}

              {onAdd && (
                <button
                  type="button"
                  className="btn btn-success btn-icon"
                  style={{ marginLeft: "8px" }}
                  onClick={() => {
                    onAdd();
                  }}
                  title="اضافه کردن"
                >
                  <i className="mdi mdi-plus"></i>
                </button>
              )}

              <button
                type="button"
                className="btn btn-success btn-icon"
                onClick={() => {
                  onReload();
                  setTreeItem(tree_name, "");
                }}
                title="بروزرسانی"
              >
                <i className="mdi mdi-refresh"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              <div>
                <TreeSingle trees={tree_data} tree_name={tree_name} />
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
