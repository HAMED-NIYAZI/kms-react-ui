import { useEffect, useState } from "react";
import SpinnerBtn from "../Spinner/SpinnerBtn";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import OrganizationService from "../../services/OrganizationService";
import { toast } from "react-toastify";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import OrganizationTreeModalSingleSelect from "../Organization/OrganizationTreeModalSingleSelect";
import ChartTreeModalSingleSelect from "./ChartTreeModalSingleSelect";
function ChartCreate({
  treeItem,
  setTreeItem,
}: Readonly<{
  treeItem: any;
  setTreeItem: (treeName: string, item: null) => void;
}>) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      persianTitle: "",
      sortingNumber: 0,
      parentId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        values.parentId = treeItem["OrganizationViewList_ModalCreate"]?.id;
        setTreeItem("OrganizationViewList_ModalCreate", null);

        const response = await OrganizationService.create(values);
        if (response.data.result === 0) {
          resetForm();
          toast.success(response.data.message);
          setTreeItem("OrganizationViewList_ModalCreate", null);
          navigate("/organizations");
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
      } finally {
        debugger;
        setLoading(false);
      }
    },
    validationSchema: Yup.object({
      persianTitle: Yup.string()
        .required("پرکردن این فیلد الزامیست")
        .max(50, "حداکثر 50 کارکتر وارد کنید"),
      sortingNumber: Yup.number().required("پرکردن این فیلد الزامیست"),
      parentId: Yup.string().nullable(),
    }),
  });

  useEffect(() => {
    // setTreeItem("OrganizationViewList", null);
  }, []);

  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "چارت ها", Address: "/organizations" },
          { Title: "ایجاد چارت", Address: "/organizations/create" },
        ]}
      />

      <div className="col-xl-12">
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0">ایجاد چارت </h4>
                <NavLink
                  to={"/organizations"}
                  className=" btn btn-primary btn-icon"
                >
                  <i className="fa  fa-arrow-left"></i>
                </NavLink>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="persianTitle">نام چارت</label>
                    <input
                      id="persianTitle"
                      className="form-control"
                      placeholder="نام چارت را وارد کنید"
                      type="text"
                      {...formik.getFieldProps("persianTitle")}
                    />
                    <span className="text-danger">
                      {formik.touched.persianTitle && formik.errors.persianTitle
                        ? formik.errors.persianTitle
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="sortingNumber">اولویت نمایش</label>
                    <select
                      id="sortingNumber"
                      className="form-control"
                      {...formik.getFieldProps("sortingNumber")}
                    >
                      {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20,
                      ].map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <span className="text-danger">
                      {formik.touched.sortingNumber &&
                      formik.errors.sortingNumber
                        ? formik.errors.sortingNumber
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="col-lg-6">
                  <label htmlFor="OrganizationViewList_ModalCreate">
                    نام سازمان
                  </label>
                  <div className="row">
                    <div className="col-6">
                      <input
                        id="OrganizationViewList_ModalCreate"
                        className="form-control"
                        disabled={true}
                        value={
                          treeItem["OrganizationViewList_ModalCreate"] != null
                            ? treeItem["OrganizationViewList_ModalCreate"]
                                .persianTitle
                            : ""
                        }
                        type="text"
                      />
                    </div>
                    <div className="col-2">
                      <OrganizationTreeModalSingleSelect />
                    </div>
                  </div>
                </div>

                {treeItem["OrganizationViewList_ModalCreate"] != null && (
                  <div className="col-lg-6 mb-3">
                    <label>سرشاخه</label>
                    <div className="row">
                      <div className="col-10">
                        <input
                          className="form-control"
                          disabled={true}
                          value={
                            treeItem["OrganizationChartViewList"] != null
                              ? treeItem["OrganizationChartViewList"]
                                  .persianTitle
                              : ""
                          }
                          type="text"
                        />
                      </div>

                      <div className="col-2">
                        <ChartTreeModalSingleSelect
                          key={treeItem["OrganizationViewList_ModalCreate"].id}
                          id={treeItem["OrganizationViewList_ModalCreate"].id}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer text-center">
              {loading ? (
                <SpinnerBtn />
              ) : (
                <button type="submit" className="btn btn-primary">
                  ذخیره
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    treeItem: state.singleSelectedTreeItemState.single_selected_tree_item,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setTreeItem: (tree_name: string, item: null) =>
      dispatch(setSingleSelectedTreeItemAction(item, tree_name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartCreate);
