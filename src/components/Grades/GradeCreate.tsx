import { useFormik } from "formik";
import * as Yup from "yup";
import GradeService from "../../services/GradeService";
import { useState } from "react";
import { toast } from "react-toastify";
import Master from "../Layoutes/Master";

const GradeCreate = () => {
  let [isLoading, setIsLoading] = useState(false);

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
        } else if (response.data.result == 5) {
          // user not found
          // toast.warn(response.data.message);
        } else if (response.data.result == 4) {
          // exeption error
          // toast.error(response.data.message);
        } else {
          // other unhandled errors
          // toast.error("خطای ناشناخته رخ داده است");
        }
      } catch (err: any) {
        console.log(err);

        if (err.code == "ERR_BAD_REQUEST") {
          if (
            err.response.status == 404 &&
            err.message == "Request failed with status code 404"
          ) {
            // toast.error(err.response.data.message);
          }
        }
        //  server is down
        if (err.code == "ERR_NETWORK") {
          // toast.error("سرور در دسترس نیست");
          return;
        }

        //validation errors occurred
        if (
          err.response.data.status == 400 &&
          err.response.data.title == "One or more validation errors occurred."
        ) {
          // for (const key in myerrors) {
          //   if (myerrors.hasOwnProperty(key)) {
          //     myerrors[key].forEach((error: any) => {
          //       // toast.error(error);
          //     });
          //   }
          // }
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
    <Master>
      <div className="row mt-4">
        <div className="col-xl-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0">ایجاد پایه تحصیلی</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>عنوان پایه تحصیلی</label>
                      <input
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
                      <label>اولویت نمایش</label>
                      <select
                        className="form-control"
                        {...formik.getFieldProps("sortingNumber")}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
                          i == 1 ? (
                            <option selected value={i}>
                              {i}
                            </option>
                          ) : (
                            <option value={i}>{i}</option>
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
                    className="btn btn-primary btn-sm"
                    title="ثبت"
                  >
                    <i className="fa fa-save"></i>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Master>
  );
};

export default GradeCreate;
