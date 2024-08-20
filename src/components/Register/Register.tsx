import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="row no-gutter">
      <div className="col-md-5 col-lg-5 col-xl-5 d-none d-md-flex bg-primary-transparent">
        <div className="row wd-100p mr-center text-center">
          <div className="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
            <img
              src="assets/img/media/login.png"
              className="my-auto ht-xl-80p wd-md-100p wd-xl-80p mr-center"
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="col-md-7 col-lg-7 col-xl-7 bg-white">
        <div className="login d-flex align-items-center py-2">
          <div className="container p-0">
            <div className="row">
              <div className="col-md-10 col-lg-10 col-xl-9 mr-center">
                <div className="card-sigin">
                  <div className="card-sigin">
                    <div className="card-sigin d-flex mb-5">
                      <h1
                        className="main-logo1 ms-1 me-0 my-auto tx-28 ps-1"
                        style={{ marginTop: "20px !important" }}
                      >
                        درخواست عضویت
                      </h1>
                    </div>
                    <div className="card-sigin">
                      <div className="main-signup-header">
                        <form className="row" action="#">
                          <div className="form-group col-lg-6">
                            <label>نام</label>

                            <input
                              className="form-control"
                              v-model="formData.firstName"
                              placeholder="نام خود را وارد کنید"
                              type="text"
                            />
                          </div>
                          <div className="form-group col-lg-6">
                            <label>نام خانوادگی</label>
                            <input
                              className="form-control"
                              placeholder="نام خانوادگی خود را وارد کنید"
                              type="text"
                            />
                            <div
                              style={{ fontSize: "11px" }}
                              className="text-danger"
                            ></div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>شماره موبایل</label>
                            <input
                              className="form-control"
                              placeholder="شماره موبایل خود را وارد کنید"
                              type="text"
                            />
                            <div
                              style={{ fontSize: "11px" }}
                              className="text-danger"
                            ></div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>آدرس ایمیل</label>
                            <input
                              className="form-control"
                              placeholder="آدرس ایمیل خود را وارد کنید"
                              type="text"
                            />
                            <div
                              style={{ fontSize: "11px" }}
                              className="text-danger"
                            ></div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>کد ملی</label>
                            <input
                              className="form-control"
                              placeholder="کد ملی خود را وارد کنید"
                              type="text"
                            />
                            <div
                              style={{ fontSize: "11px" }}
                              className="text-danger"
                            ></div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>شماره پرسنلی</label>
                            <input
                              className="form-control"
                              placeholder="شماره پرسنلی خود را وارد کنید"
                              type="text"
                            />
                            <div
                              style={{ fontSize: "11px" }}
                              className="text-danger"
                            ></div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>سازمان</label>
                            <div className="row" style={{ marginTop: "-5px" }}>
                              <div className="col-10">
                                <input className="form-control" type="text" />
                              </div>

                              <div className="col-2"></div>
                            </div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>چارت سازمانی</label>
                            <div className="row" style={{ marginTop: "-5px" }}>
                              <div className="col-10">
                                <input className="form-control" type="text" />
                              </div>

                              <div className="col-2"></div>
                            </div>
                          </div>

                          <div className="form-group col-lg-6">
                            <label>کلمه عبور</label>
                            <input
                              className="form-control"
                              placeholder="رمز عبور خود را وارد کنید"
                              type="password"
                            />
                            <div
                              style={{ fontSize: "11px" }}
                              className="text-danger"
                            ></div>
                          </div>
                          <div className="form-group col-lg-6">
                            <label>تکرار کلمه عبور</label>
                            <input
                              className="form-control"
                              placeholder="تکرار رمز عبور خود را وارد کنید"
                              type="confirmPassword"
                            />
                            <div
                              style={{ fontSize: "11px" }}
                              className="text-danger"
                            ></div>
                          </div>

                          <div
                            className="form-group col-lg-6"
                            style={{ marginTop: "40px" }}
                          >
                            {/* <Spinner_btn  /> */}
                            <button
                              type="button"
                              className="btn btn-main-primary btn-block"
                            >
                              ثبت درخواست
                            </button>
                          </div>

                          <div
                            className="form-group col-lg-6"
                            style={{ marginTop: "40px" }}
                          >
                            <button
                              type="button"
                              className="btn btn-main-primary btn-block"
                              onClick={() => navigate("/Login")}
                            >
                              بازگشت به صفحه لاگین
                            </button>
                          </div>
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
