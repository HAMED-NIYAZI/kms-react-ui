import { useEffect, useState } from "react";
import SpinnerBtn from "../Spinner/Spinner_btn";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrganizationService from "../../services/OrganizationService";
import { toast } from "react-toastify";

export default function KnowledgeFieldEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: "",
      persianTitle: "",
      sortingNumber: "",
      parentId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLloading(true);
      try {
        // if (treeItem["OrganizationViewList_ModalCreate"].id) {
        //   values.parentId = treeItem["OrganizationViewList_ModalCreate"].id;
        // }

        const response = await OrganizationService.update(values);
        if (response.data.result === 0) {
          resetForm();
          toast.success(response.data.message);
          // setTreeItem("OrganizationViewList_ModalCreate", null);
          navigate("/KnowledgeFieldPage");
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
      } finally {
        setLloading(false);
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
    try {
      const response = await OrganizationService.getById(id);
      formik.setValues({ ...response.data.data });
      // setTreeItem("OrganizationViewList_ModalCreate", {
      //   id: response.data.data.parentId,
      //   persianTitle: response.data.data.parentPersianTitle,
      // });
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    if (params.id) {
      getById(params.id);
    }
  }, []);

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
              ویرایش سازمان
            </span>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        {loading === false && (
          <form onSubmit={formik.handleSubmit}>
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0">ویرایش سازمان</h4>
                  <NavLink
                    to={"/organizations"}
                    className=" btn btn-primary btn-sm"
                  >
                    <i className="fa  fa-arrow-left"></i>
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label>نام سازمان</label>
                      <input
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

                  <div className="col-lg-6">
                    <label>نام سرشاخه</label>
                    <div className="col-2">
                      {/* <OrganizationTreeModalSingleSelect /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                {loading ? (
                  <SpinnerBtn />
                ) : (
                  <button type="submit" className="btn btn-warning btn-sm">
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
