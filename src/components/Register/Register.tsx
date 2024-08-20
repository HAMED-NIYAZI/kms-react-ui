export default function Register() {
  return (
    <div className="row no-gutter">
      <div className="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
        <div className="row wd-100p m-auto text-center">
          <div className="col-md-12 col-lg-12 col-xl-12 my-auto m-auto wd-100p">
            <img
              src="assets/img/media/login.png"
              className="my-auto ht-xl-80p wd-md-100p wd-xl-80p m-auto"
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xl-5 bg-white">
        <div className="login d-flex align-items-center py-2">
          <div className="container p-0">
            <div className="row">
              <div className="col-md-10 col-lg-10 col-xl-9 m-auto">
                <div className="card-sigin">
                  <div className="mb-5 d-flex">
                    <a href="index.html">
                      <img
                        src="assets/img/brand/favicon.png"
                        className="sign-favicon-a ht-40"
                        alt="logo"
                      />
                      <img
                        src="assets/img/brand/favicon-white.png"
                        className="sign-favicon-b ht-40"
                        alt="logo"
                      />
                    </a>
                    <h1 className="main-logo1 ms-1 me-0 my-auto tx-28">
                      Va<span>le</span>x
                    </h1>
                  </div>
                  <div className="main-signup-header">
                    <h2 className="text-primary">شروع کردن</h2>
                    <h5 className="fw-normal mb-4">
                      این رایگان است برای ثبت نام و فقط یک دقیقه طول می کشد.
                    </h5>
                    <form action="#">
                      <div className="form-group">
                        <label>نام &amp; نام خانوادگی</label>{" "}
                        <input
                          className="form-control"
                          placeholder="نام خانوادگی و نام خانوادگی خود را وارد کنید"
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <label>پست الکترونیک</label>{" "}
                        <input
                          className="form-control"
                          placeholder="ایمیل خود را وارد کنید"
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <label>کلمه عبور</label>{" "}
                        <input
                          className="form-control"
                          placeholder="رمز عبور خود را وارد کنید"
                          type="password"
                        />
                      </div>
                      <a
                        href="signin.html"
                        className="btn btn-main-primary btn-block"
                      >
                        ایجاد حساب کاربری
                      </a>
                      <div className="row row-xs">
                        <div className="col-sm-6">
                          <button className="btn btn-block">
                            <i className="fab fa-facebook-f"></i> ثبت نام با
                            حساب فیسبوک
                          </button>
                        </div>
                        <div className="col-sm-6 mg-t-10 mg-sm-t-0">
                          <button className="btn btn-info btn-block btn-b">
                            <i className="fab fa-twitter"></i> ثبت نام با توییتر
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="main-signup-footer mt-5">
                      <p>
                        در حال حاضر یک حساب کاربری دارید؟{" "}
                        <a href="signin.html">ورود</a>
                      </p>
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
