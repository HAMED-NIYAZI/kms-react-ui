import { useFormik } from "formik";
import * as Yup from "yup";
import GradeService from "../../services/GradeService";
import { useState } from "react";
import { toast } from "react-toastify";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { NavLink, useNavigate } from "react-router-dom";

const GradeCreate = () => {
  let [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      gradeName: "",
      sortingNumber: 1,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const response = await GradeService.create({
          gradeName: values.gradeName,
          sortingNumber: values.sortingNumber,
        });
        if (response.data.result == 0) {
          toast.success(response.data.message);
          navigate("/grades");
        } else {
          toast.error(response.data.message);
        }
      } catch (err: any) {
        console.log(err);

        if (err.code == "ERR_BAD_REQUEST") {
          if (
            err.response.status == 404 &&
            err.message == "Request failed with status code 404"
          ) {
            toast.error(err.response.data.message);
          }
        }
        //  server is down
        if (err.code == "ERR_NETWORK") {
          toast.error("سرور در دسترس نیست");
          return;
        }

        //validation errors occurred
        if (
          err.response.data.status == 400 &&
          err.response.data.title == "One or more validation errors occurred."
        ) {
          for (const key in err) {
            if (err.hasOwnProperty(key)) {
              err[key].forEach((error: any) => {
                toast.error(error);
              });
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
      resetForm();
    },
    validationSchema: Yup.object({
      gradeName: Yup.string().required("پرکردن این فیلد اجباریست"),
      sortingNumber: Yup.number().required("پرکردن این فیلد اجباریست"),
    }),
  });

  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "پایه تحصیلی", Address: "/grades" },
          { Title: "ایجاد پایه تحصیلی", Address: "/grades/create" },
        ]}
      />
      <div className="row mt-4">
        <div className="col-xl-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0">ایجاد پایه تحصیلی</h4>
                  <div className="d-flex flex-row-reverse">

                  <NavLink to="/grades" className=" btn btn-primary btn-icon m-2">
                            <i className="fa fa-arrow-left"></i>
                        </NavLink>
                </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="gradeName">عنوان پایه تحصیلی</label>
                      <input
                        id="gradeName"
                        className="form-control"
                        {...formik.getFieldProps("gradeName")}
                        placeholder="عنوان پایه تحصیلی را وارد کنید"
                        type="text"
                      />
                      <span className="text-danger">
                        {formik.touched.gradeName && formik.errors.gradeName
                          ? formik.errors.gradeName
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="sortingNumber">اولویت نمایش</label>
                      <select
                      id="sortingNumber"
                        className="form-control"
                        {...formik.getFieldProps("sortingNumber")}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
                          i == 1 ? (
                            <option key={i} selected value={i}>
                              {i}
                            </option>
                          ) : (
                            <option  key={i} value={i}>{i}</option>
                          )
                        )}
                      </select>
                      <span className="text-danger">
                        {formik.touched.sortingNumber &&
                        formik.errors.sortingNumber
                          ? formik.errors.sortingNumber
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                {isLoading && (
                  <div className="text-center">
                    <span className="spinner-border spinner-border-sm"></span>
                  </div>
                )}
                {!isLoading && (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    title="ذخیره"
                  >
                    ذخیره
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GradeCreate;
