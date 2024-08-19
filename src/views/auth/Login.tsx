import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/AuthService";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "2669929826",
      password: "123",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      //  signInLoading.value = true;
      //  errors = {};
      try {
        const response = await AuthService.login({
          userName: values.email,
          password: values.password,
        });
        if (response.data.result == 0) {
          console.log(response.data);
          //success
          //  localStorageService.setUser(response.data.data.user);
          //  localStorageService.setToken(response.data.data.token);
          //  localStorageService.setExpiresAt(response.data.data.expires_at);
          //  router.push({ name: "dashboard" });
        } else if (response.data.result == 5) {
          // user not found
          //  toast.warning(response.data.message, {
          //    timeout: 3000,
          //  });
        } else if (response.data.result == 4) {
          // exeption error
          //  toast.error(response.data.message, {
          //    timeout: 3000,
          //  });
        } else {
          // other unhandled errors
          //  toast.error("خطای ناشناخته رخ داده است", {
          //    timeout: 3000,
          //  });
        }
      } catch (err) {
        console.log(err);

        //  if (err.code == "ERR_BAD_REQUEST") {
        //    if (
        //      err.response.status == 404 &&
        //      err.message == "Request failed with status code 404"
        //    ) {
        //      toast.error(err.response.data.message, {
        //        timeout: 4000,
        //      });
        //    }
        //  }
        //server is down
        //  if (err.code == "ERR_NETWORK") {
        //    toast.error("سرور در دسترس نیست", {
        //      timeout: 4000,
        //    });
        //    return;
        //  }

        //validation errors occurred
        //  if (
        //    err.response.data.status == 400 &&
        //    err.response.data.title == "One or more validation errors occurred."
        //  ) {
        //    var myerrors = err.response.data.errors;
        //    for (const key in myerrors) {
        //      if (myerrors.hasOwnProperty(key)) {
        //        myerrors[key].forEach((error) => {
        //          toast.error(error, {
        //            timeout: 4000,
        //          });
        //        });
        //      }
        //    }
        //  }
      } finally {
        //  signInLoading.value = false;
      }
      resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string("باید رشته ای باشد").required(
        "وارد کردن ایمیل الزامیست"
      ),
      password: Yup.string("باید رشته ای باشد").required(
        "وارد کردن پسورد الزامیست"
      ),
    }),
  });
  const myImgStyle = {
    borderRadius: "10px",
  };

  return (
    <div className="row no-gutter">
      <div className="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
        <div className="row wd-100p mr-center text-center">
          <div className="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
            <img
              src="assets/img/media/4.jpg"
              style={myImgStyle}
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
                        src="assets/img/brand/favicon.png"
                        className="sign-favicon-a ht-40"
                        alt="logo"
                      />
                      <h1 className="main-logo1 ms-1 me-0 my-auto tx-28 ps-1">
                        نرم افزار مدیریت دانش
                      </h1>
                    </div>
                    <div className="card-sigin">
                      <div className="main-signup-header">
                        <h2> ورود به سامانه</h2>

                        <form action="" onSubmit={formik.handleSubmit}>
                          <div className="form-group">
                            <label>نام کاربری </label>{" "}
                            <input
                              className="form-control"
                              placeholder="ایمیل خود را وارد کنید"
                              type="text"
                              {...formik.getFieldProps("email")}
                            />
                            <span className="text-danger">
                              {formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>کلمه عبور</label>{" "}
                            <input
                              className="form-control"
                              {...formik.getFieldProps("password")}
                              placeholder="رمز عبور خود را وارد کنید"
                              type="password"
                            />
                            <span className="text-danger">
                              {formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : ""}
                            </span>
                          </div>
                          <button className="btn btn-main-primary btn-block">
                            ورود
                          </button>

                          <button className="btn btn-success btn-block">
                            درخواست عضویت
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
