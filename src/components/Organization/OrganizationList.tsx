import { connect } from "react-redux";
import OrganizationTree from "./OrganizationTree";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import OrganizationService from "../../services/OrganizationService";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import SpinnerBtn from "../Spinner/SpinnerBtn";

function OrganizationList({
  tree_name,
  treeSingleSelectValue,
  setTreeItem,
}: Readonly<{
  tree_name?: string;
  treeSingleSelectValue: any;
  setTreeItem: any;
}>) {
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [key, setKey] = useState(0);

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
        setKey((n) => n + 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRemove(false);
    }
  }
  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "سازمان ها", Address: "/organizations" },
        ]}
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="row pad">
            <div className="col-lg-12">
              <div className="d-flex gap-1"></div>
              <div className="d-flex justify-content-end   align-items-center gap-1 mb-2">
                {loadingRemove && <SpinnerBtn />}
                {!loadingRemove &&
                  treeSingleSelectValue["OrganizationViewList"]
                    ?.persianTitle && (
                    <button
                      className="btn btn-danger btn-icon"
                      onClick={() =>
                        remove(
                          treeSingleSelectValue["OrganizationViewList"].id,
                          treeSingleSelectValue["OrganizationViewList"]
                            .persianTitle
                        )
                      }
                      title="حذف"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  )}

                {treeSingleSelectValue["OrganizationViewList"]
                  ?.persianTitle && (
                  <NavLink
                    to={`/organizations/edit/${treeSingleSelectValue["OrganizationViewList"].id}`}
                    className="btn btn-warning btn-icon"
                    title="ویرایش"
                  >
                    <i className="fa fa-pen"></i>
                  </NavLink>
                )}

                <NavLink
                  className="btn btn-success btn-icon"
                  to={"/organizations/create"}
                  title="ایجاد"
                >
                  <i className="fa fa-plus"></i>
                </NavLink>
              </div>
            </div>
          </div>
          <OrganizationTree tree_name="OrganizationViewList" key={key} />
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
