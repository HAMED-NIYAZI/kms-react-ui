import { connect } from "react-redux";
import ChartTree from "./ChartTree";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import SpinnerBtn from "../Spinner/SpinnerBtn";
import ChartService from "../../services/ChartService";

function ChartList({
  treeItem,
  setTreeItem,
}: Readonly<{
  treeItem: any;
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
      let response = await ChartService.delete(id);

      if (response.data.result == 4) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.result == 0) {
        toast.success("عملیات حذف با موفقیت انجام شد");
        setTreeItem("ChartTree", null);
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
          { Title: "چارت ها", Address: "/charts" },
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
                  treeItem["OrganizationChartViewList"]?.persianTitle && (
                    <button
                      className="btn btn-danger btn-icon"
                      onClick={() =>
                        remove(
                          treeItem["OrganizationChartViewList"].id,
                          treeItem["OrganizationChartViewList"].persianTitle
                        )
                      }
                      title="حذف"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  )}

                {treeItem["OrganizationChartViewList"]?.persianTitle && (
                  <NavLink
                    to={`/charts/edit/${treeItem["OrganizationChartViewList"].id}`}
                    className="btn btn-warning btn-icon"
                    title="ویرایش"
                  >
                    <i className="fa fa-pen"></i>
                  </NavLink>
                )}

                <NavLink
                  className="btn btn-success btn-icon"
                  to={"/charts/create"}
                  title="ایجاد"
                >
                  <i className="fa fa-plus"></i>
                </NavLink>
              </div>
            </div>
          </div>
          <ChartTree tree_name="OrganizationChartViewList" key={key} />
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch: (p: any) => void) => {
  return {
    setTreeItem: (treeName: string, payload: object | null) =>
      dispatch(setSingleSelectedTreeItemAction(payload, treeName)),
  };
};
const mapStateToProps = (state: any) => {
  return {
    treeItem: state.singleSelectedTreeItemState.single_selected_tree_item,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartList);
