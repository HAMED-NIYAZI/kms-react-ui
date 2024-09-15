import { connect } from "react-redux";
// import ChartTree from "./ChartTree";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
// import SpinnerBtn from "../Spinner/SpinnerBtn";
import ChartService from "../../services/ChartService";
import SingleSelectTreeComponent from "../KnowledgeField/SingleSelectTreeComponent";
import OrganizationService from "../../services/OrganizationService";

// interface ChartListInterface {
//   treeItem: any;
//   setTreeItem(treeName: string, treeItem: any): void;
// }

function ChartList() {
  const [treeOrganizationData, setTreeOrganizationData] = useState([]);
  let [treeChartData, setTreeChartData] = useState([]);

  async function handleDelete(id: string, name: string) {
    //حذف ایتم انتخاب شده
    if (!confirm("آیا مایل به حذف  (" + name + ")  هستید؟")) {
      return;
    }
    try {
      let response = await OrganizationService.delete(id);

      if (response.data.result == 4) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.result == 0) {
        toast.success("عملیات حذف با موفقیت انجام شد");
        index();
      }
    } catch (err) {
      console.log(err);
    } finally {
      // TODO document why this block is empty
    }
  }
  // async function remove(id: string, name: string) {
  //   if (!confirm("آیا مایل به حذف  (" + name + ")  هستید؟")) {
  //     return;
  //   }
  //   setLoadingRemove(true);
  //   try {
  //     let response = await ChartService.delete(id);

  //     if (response.data.result == 4) {
  //       toast.error(response.data.message);
  //       return;
  //     }

  //     if (response.data.result == 0) {
  //       toast.success("عملیات حذف با موفقیت انجام شد");
  //       setTreeItem("OrganizationChartViewList", null);
  //       setComponentKey((n) => n + 1);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoadingRemove(false);
  //   }
  // }
  async function getApi(id: string) {
    const response = await ChartService.getOrganizationChartTree(id);

    if (response.data.result == 0) {
      setTreeChartData(response.data.data);
    } else if (response.data.result == 5) {
      toast.warning(response.data.message);
    } else {
      toast.warning(response.data.message);
    }
  }

  const handleOrganizationId = (id: string, name: string) => {
    if (id) {
        getApi(id);
      // setTimeout(() => {
      //   console.log(id);
      // }, 1000);
    }
  };
  function handleChartId(id: string, name: string) {
    console.log(id);
    console.log(name);
  }
  const index = async () => {
    try {
      const response = await OrganizationService.getOrganizationTree();
      if (response.data.result == 0) {
        setTreeOrganizationData(response.data.data);
      } else if (response.data.result == 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    index();
    console.log("test");
  }, []);
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
            <div className="col-md-6">
              {/* <OrganizationTree tree_name="OrganizationViewList" /> */}

              <SingleSelectTreeComponent
                tree_name="organizaton-one"
                tree_caption="سازمان ها"
                tree_data={treeOrganizationData}
                onReload={() => {
                  console.log("test");
                }}
                onDelete={handleDelete}
                onGetSingleSelectValue={handleOrganizationId}
              />
            </div>
            <div className="col-md-6">
              <SingleSelectTreeComponent
                tree_name="chart-one"
                tree_caption="چارت ها"
                tree_data={treeChartData}
                onReload={() => {
                  console.log("test");
                }}
                onGetSingleSelectValue={handleChartId}
              />
              {/* <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4
                    className="card-title mg-b-0"
                    style={{ paddingTop: "10px !important" }}
                  >
                    چارت های سازمانی
                  </h4>
                  <div className="d-flex justify-content-end  align-items-center gap-1 mb-2">
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
                <div className="card-body">
                  <ChartTree
                    tree_name="OrganizationChartViewList"
                    key={componentKey}
                  />
                </div>
              </div> */}
            </div>
          </div>
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
