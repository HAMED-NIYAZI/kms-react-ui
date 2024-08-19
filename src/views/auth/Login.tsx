import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";

export default function Login() {
  const navigate = useNavigate();
  const [loginPageInfo, setLoginPageInfo] = useState({
    imagePath: "",
    title: "",
    description: "",
  });
  const formik = useFormik({
    initialValues: {
      userName: "2669929826",
      password: "123",
    },
    onSubmit: async (values, { resetForm }) => {
      //  signInLoading.value = true;
      //  errors = {};
      try {
        const response = await AuthService.login({
          userName: values.userName,
          password: values.password,
        });
        if (response.data.result == 0) {
          //success
          //save user state

          //  localStorageService.setUser(response.data.data.user);
          //  localStorageService.setToken(response.data.data.token);
          //  localStorageService.setExpiresAt(response.data.data.expires_at);
          navigate("/");
        } else if (response.data.result == 5) {
          // user not found
          toast.warn(response.data.message);
        } else if (response.data.result == 4) {
          // exeption error
          toast.error(response.data.message);
        } else {
          // other unhandled errors
          toast.error("خطای ناشناخته رخ داده است");
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
          var myerrors = err.response.data.errors;
          for (const key in myerrors) {
            if (myerrors.hasOwnProperty(key)) {
              myerrors[key].forEach((error: any) => {
                toast.error(error);
              });
            }
          }
        }
      } finally {
        //  signInLoading.value = false;
      }
      resetForm();
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("وارد کردن نام کاربری الزامیست"),
      password: Yup.string().required("وارد کردن کلمه عبور الزامیست"),
    }),
  });

  useEffect(() => {
    const getInfoForLoginPage = async () => {
      try {
        const response = await AuthService.getInfoForLoginPage();
        if (response.data.result == 0) {
          setLoginPageInfo(response.data.data);
          // localStorageService.setHomePageSetting(response.data.data);
        } else if (response.data.result == 5) {
          // toast.warning(response.data.message, {
          //   timeout: 2000,
          // });
        } else {
          // toast.warning(response.data.message, {
          //   timeout: 2000,
          // });
        }
      } catch (err) {
        console.error(err);
        /*if (err.message == "timeout of 60000ms exceeded") {
          toast.error("سرور در دسترس نیست", {
            timeout: 10000,
          });
        } else if (err.message == "Network Error") {
          toast.error("سرور در دسترس نیست", {
            timeout: 10000,
          });
        } else {
          toast.error("پاسخی از سرور دریافت نشد", {
            timeout: 10000,
          });
        } */
      } finally {
        // loading.value = false;
      }
    };

    getInfoForLoginPage();
  }, []);

  return (
    <div className="row no-gutter">
      <div className="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
        <div className="row wd-100p mr-center text-center">
          <div className="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
            <img
              src="assets/img/media/4.jpg"
              style={{ borderRadius: "10px" }}
              className="my-auto ht-xl-80p wd-md-100p wd-xl-80p mr-center"
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xl-5 bg-white">
        <div className="login d-flex align-items-center py-2">
          <div className="container p-0">
            <div className="row">
              <div className="col-md-10 col-lg-10 col-xl-9 mr-center">
                <div className="card-sigin">
                  <div className="card-sigin">
                    <div className="card-sigin d-flex mb-5">
                      <img
                        src={
                          "https://freelancework.ir/" + loginPageInfo.imagePath
                        }
                        className="sign-favicon-a ht-40"
                        style={{ height: "80px" }}
                        alt="logo"
                      />
                      <h4 className="main-logo1 ms-1 me-0 my-auto ps-1">
                        {loginPageInfo.title}
                      </h4>
                    </div>
                    <div className="card-sigin">
                      <div className="main-signup-header">
                        <h4 style={{ paddingBottom: "30px", color: "#0162e8" }}>
                          ورود به سامانه
                        </h4>

                        <form action="" onSubmit={formik.handleSubmit}>
                          <div className="form-group">
                            <label>نام کاربری </label>{" "}
                            <input
                              className="form-control"
                              placeholder="نام کاربری خود را وارد کنید"
                              type="text"
                              {...formik.getFieldProps("userName")}
                            />
                            <span className="text-danger">
                              {formik.touched.userName && formik.errors.userName
                                ? formik.errors.userName
                                : ""}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>کلمه عبور</label>{" "}
                            <input
                              className="form-control"
                              {...formik.getFieldProps("password")}
                              placeholder="کلمه عبور خود را وارد کنید"
                              type="password"
                            />
                            <span className="text-danger">
                              {formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : ""}
                            </span>
                          </div>
                          <button
                            className="btn btn-main-primary btn-block"
                            type="submit"
                          >
                            ورود
                          </button>

                          <button
                            className="btn btn-success btn-block"
                            onClick={() => navigate("/register")}
                          >
                            درخواست عضویت
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card-sigin"
                  v-if="loginPageInfo.description"
                  style={{
                    marginTop: "60px",
                    border: "solid 2px #e1e5ef",
                    borderRadius: "5px",
                    padding: "15px",
                  }}
                >
                  {loginPageInfo.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
