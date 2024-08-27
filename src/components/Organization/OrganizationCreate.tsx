import { useState } from "react";
import SpinnerBtn from "../Spinner/Spinner_btn";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrganizationTreeModalSingleSelect from "./OrganizationTreeModalSingleSelect";
import { connect } from "react-redux";
import OrganizationService from "../../services/OrganizationService";
import { toast } from "react-toastify";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
function OrganizationCreate({
  treeItem,
  setTreeItem,
}: {
  treeItem: any;
  setTreeItem: (treeName: string, item: null) => void;
}) {
  const navigate = useNavigate();

  const [loading, setLloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      persianTitle: "",
      sortingNumber: 0,
      parentId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLloading(true);
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
        // toast.error(err.message);
      } finally {
        debugger;
        setLloading(false);
      }
    },
    validationSchema: Yup.object({
      persianTitle: Yup.string()
        .required("پرکردن این فیلد الزامیست")
        .max("50", "حداکثر 50 کارکتر وارد کنید"),
      sortingNumber: Yup.number("باید عددی باشد").required(
        "پرکردن این فیلد الزامیست"
      ),
      parentId: Yup.string().nullable(),
    }),
  });

  return (
    <>
      <div className="breadcrumb-header justify-content-between">
        <div className="my-auto">
          <div className="d-flex">
            <h4 className="content-title mb-0 my-auto">
              <NavLink
                to={"/organizations"}
                className="content-title mb-0 my-auto"
              >
                سازمان ها
              </NavLink>
            </h4>
            <span className="text-muted mt-1 tx-13 ms-2 mb-0">
              <NavLink to={"/organizations/create"}>
                {" "}
                اضافه کردن سازمان{" "}
              </NavLink>
            </span>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0">اضافه کردن سازمان</h4>
                <NavLink
                  to={"/organizations/create"}
                  className=" btn btn-primary btn-icon"
                >
                  <i className="fa  fa-arrow-left"></i>
                </NavLink>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group">
                    <label>نام سازمان</label>
                    <input
                      className="form-control"
                      placeholder="نام سازمان را وارد کنید"
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
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>اولویت نمایش</label>
                    <select
                      className="form-control"
                      {...formik.getFieldProps("sortingNumber")}
                    >
                      {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20,
                      ].map((i) => (
                        <option value={i}>{i}</option>
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

                <div className="col-lg-12">
                  <label>نام سرشاخه</label>
                  <div className="row">
                    <div className="col-6">
                      <input
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
              </div>
            </div>
            <div className="card-footer text-center">
              {loading ? (
                <SpinnerBtn />
              ) : (
                <button type="submit" className="btn btn-success btn-sm">
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
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationCreate);
