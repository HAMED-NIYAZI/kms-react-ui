import { connect } from "react-redux";
import OrganizationTree from "./OrganizationTree";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import OrganizationService from "../../services/OrganizationService";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function OrganizationList({
  tree_name,
  treeSingleSelectValue,
  setTreeItem,
}: {
  tree_name: string;
  treeSingleSelectValue: any;
  setTreeItem: any;
}) {
  const [loadingRemove, setLoadingRemove] = useState(false);
  async function remove(id: string, name: string) {
    if (!confirm("آیا مایل به حذف  (" + name + ")  هستید؟")) {
      return;
    }
    setLoadingRemove(true);
    try {
      let response = await OrganizationService.delete(id);

      if (response.data.result == 4) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.result == 0) {
        toast.success("عملیات حذف با موفقیت انجام شد");
        setTreeItem(tree_name, "");
        // index();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRemove(false);
    }
  }
  return (
    <>
      <br />
      <br />

      <div className="row">
        <div className="col-lg-12">
          <div className="row pad">
            <div className="d-flex gap-1"></div>
            <div className="d-flex justify-content-end   align-items-center gap-1 mb-2">
              {loadingRemove && (
                <div
                  className="spinner-border text-primary spinner-border-sm"
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
              )}
              {!loadingRemove &&
                treeSingleSelectValue["OrganizationViewList"]?.persianTitle && (
                  <a
                    href="#"
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      remove(
                        treeSingleSelectValue["OrganizationViewList"].id,
                        treeSingleSelectValue["OrganizationViewList"]
                          .persianTitle
                      )
                    }
                    title="حذف سازمان"
                  >
                    <i className="fa fa-trash "></i>
                  </a>
                )}

              {treeSingleSelectValue["OrganizationViewList"]?.persianTitle && (
                <NavLink
                  to={`/organizations/edit/${treeSingleSelectValue["OrganizationViewList"].id}`}
                  className="btn btn-warning btn-sm"
                  title="ویرایش سازمان"
                >
                  <i className="fa fa-pen"></i>
                </NavLink>
              )}

              <NavLink
                className="btn btn-success btn-sm"
                to={"/organizations/create"}
                title="ایجاد سازمان"
              >
                <i className="fa fa-plus"></i>
              </NavLink>
              {/* <a
                href="#"
                onClick={() => console.log("first")}
                title="بروزرسانی"
              >
                بروزرسانی
              </a> */}
            </div>
          </div>
          <OrganizationTree tree_name="OrganizationViewList" />
        </div>
      </div>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationList);
