import { useEffect, useState } from "react";
import SpinnerBtn from "../Spinner/SpinnerBtn";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrganizationTreeModalSingleSelect from "./OrganizationTreeModalSingleSelect";
import { connect } from "react-redux";
import OrganizationService from "../../services/OrganizationService";
import { toast } from "react-toastify";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

function OrganizationEdit({
  treeItem,
  setTreeItem,
}: Readonly<{
  treeItem: any;
  setTreeItem: (treeName: string, item: any) => void;
}>) {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: "",
      persianTitle: "",
      sortingNumber: "",
      parentId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        if (treeItem["OrganizationViewList_ModalCreate"].id) {
          values.parentId = treeItem["OrganizationViewList_ModalCreate"].id;
        }

        const response = await OrganizationService.update(values);
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

  async function getById(id: string) {
    setTreeItem("OrganizationViewList", null);
    try {
      const response = await OrganizationService.getById(id);
      formik.setValues({ ...response.data.data });
      setTreeItem("OrganizationViewList_ModalCreate", {
        id: response.data.data.parentId,
        persianTitle: response.data.data.parentPersianTitle,
      });
    } catch (err) {}
  }
  useEffect(() => {
    if (params.id) {
      getById(params.id);
    }
  }, []);

  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "سازمان ها", Address: "/organizations" },
          {
            Title: "ویرایش سازمان",
            Address: "/organizations/edit/" + params.id,
          },
        ]}
      />

      <div className="col-xl-12">
        {loading === false && (
          <form onSubmit={formik.handleSubmit}>
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0">ویرایش سازمان</h4>
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
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="persianTitle">نام سازمان</label>
                      <input
                        id="persianTitle"
                        className="form-control"
                        placeholder="نام سازمان را وارد کنید"
                        type="text"
                        {...formik.getFieldProps("persianTitle")}
                      />
                      <span className="text-danger">
                        {formik.touched.persianTitle &&
                        formik.errors.persianTitle
                          ? formik.errors.persianTitle
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2">
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
                      نام سرشاخه
                    </label>
                    <div className="row align-items-center">
                      <div className="col-10">
                        <input
                          id="OrganizationViewList_ModalCreate"
                          className="form-control"
                          disabled={true}
                          value={
                            treeItem["OrganizationViewList_ModalCreate"] !=
                            undefined
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
                  <button type="submit" className="btn btn-primary">
                    ذخیره
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
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
    setTreeItem: (tree_name: string, item: any) =>
      dispatch(setSingleSelectedTreeItemAction(item, tree_name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationEdit);
