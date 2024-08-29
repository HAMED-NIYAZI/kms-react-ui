import { useFormik } from "formik";
import { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import UserService from "../../services/UserService";
import SpinnerBtn from "../Spinner/Spinner_btn";
import { toast } from "react-toastify";
import { setUser } from "../../store/actions/user-actions";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

function Profile({
  user,
  setUser,
}: Readonly<{
  user: any;
  setUser: (user: any) => void;
}>) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      address: user.address.trim(),
      about: user.about.trim(),
    },
    onSubmit: async (values, {}) => {
      setIsLoading(true);
      try {
        console.log(values);
        const response = await UserService.updateProfile(values);
        if (response.data.result == 0) {
          setUser(response.data.data);
          toast.success(response.data.message);
          // TODO: Reload the window
        } else if (response.data.result == 5) {
          toast.warning(response.data.message);
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("وارد کردن نام الزامیست"),
      lastName: Yup.string().required("وارد کردن نام خانوادگی الزامیست"),
      phone: Yup.number().required("وارد کردن شماره تلفن الزامیست"),
      email: Yup.string().required("وارد کردن آدرس ایمیل الزامیست"),
      address: Yup.string().required("وارد کردن آدرس الزامیست"),
      about: Yup.string().required("وارد کردن درباره من الزامیست"),
    }),
  });
  const formikPassword = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await UserService.updatePassword(values, user.id);

        if (response.data.result == 0) {
          toast.success(response.data.message);
          resetForm();
        } else if (response.data.result == 5) {
          toast.warning(response.data.message);
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("وارد کردن رمز جاری الزامیست"),
      newPassword: Yup.string().required("وارد کردن رمز جدید الزامیست"),
      confirmPassword: Yup.string().required(
        "وارد کردن تکرار رمز جدید الزامیست"
      ),
    }),
  });

  async function loadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    if (!(target && target.files && target.files[0])) {
      return;
    }

    try {
      let fd = new FormData();

      fd.append("file", target.files[0]);

      const response = await UserService.uploadAvatar(fd, user.userId);

      if (response.data.result == 0) {
        toast.success(response.data.message);

        setUser(response.data.data);
      } else if (response.data.result == 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {}
  }

  return (
    <>
      <BreadCrumb BreadList={[{ Title: "پروفایل من  ", Address: "" }]} />
      <div className="row row-sm">
        <div className="col-lg-4">
          <div className="card mg-b-20">
            <div className="card-body">
              <div className="pl-0">
                <div className="main-profile-overview">
                  <div className="main-img-user profile-user">
                    <img
                      alt={user.firstName + " " + user.lastName}
                      src={"https://freelancework.ir/" + user.imagePath}
                      onClick={() => $("#avatar").click()}
                      style={{ cursor: "pointer" }}
                    />
                    <a
                      href="#"
                      onClick={() => $("#avatar").click()}
                      className="fas fa-camera profile-edit curser-hand"
                      title=" آپلود تصویر جدید"
                    ></a>
                    <input
                      type="file"
                      id="avatar"
                      onChange={(e) => loadAvatar(e)}
                      className="d-none"
                    />
                  </div>
                  <div className="d-flex justify-content-between mg-b-20">
                    <div>
                      <h5 className="main-profile-name">
                        {user.firstName + " " + user.lastName}
                      </h5>
                    </div>
                  </div>
                  <h6>بیوگرافی</h6>
                  <div className="main-profile-bio">
                    <p>{user.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    مشخصات
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    کلمه عبور
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="card">
                    <form
                      action=""
                      className="form-horizontal"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="card-body">
                        <div className="mb-4 main-content-label">
                          اطلاعات شخصی
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">نام</label>
                            </div>
                            <div className="col-md-9">
                              <input
                                type="text"
                                {...formik.getFieldProps("firstName")}
                                className="form-control"
                                placeholder="نام کوچک"
                              />
                              <span className="text-danger">
                                {formik.touched.firstName &&
                                formik.errors.firstName
                                  ? formik.errors.firstName
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">نام خانوادگی</label>
                            </div>
                            <div className="col-md-9">
                              <input
                                type="text"
                                {...formik.getFieldProps("lastName")}
                                className="form-control"
                                placeholder="نام خانوادگی"
                              />
                              <span className="text-danger">
                                {formik.touched.lastName &&
                                formik.errors.lastName
                                  ? formik.errors.lastName
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">شماره موبایل</label>
                            </div>
                            <div className="col-md-9">
                              <input
                                className="form-control"
                                {...formik.getFieldProps("phone")}
                                placeholder="شماره موبایل خود را وارد کنید"
                                type="text"
                              />
                              <span className="text-danger">
                                {formik.touched.phone && formik.errors.phone
                                  ? formik.errors.phone
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">آدرس ایمیل</label>
                            </div>
                            <div className="col-md-9">
                              <input
                                className="form-control"
                                {...formik.getFieldProps("email")}
                                placeholder="آدرس ایمیل خود را وارد کنید"
                                type="text"
                              />
                              <span className="text-danger">
                                {formik.touched.email && formik.errors.email
                                  ? formik.errors.email
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">نشانی</label>
                            </div>
                            <div className="col-md-9">
                              <textarea
                                className="form-control"
                                style={{ resize: "none" }}
                                {...formik.getFieldProps("address")}
                                rows={4}
                                placeholder="نشانی"
                              ></textarea>
                              <span className="text-danger">
                                {formik.touched.address && formik.errors.address
                                  ? formik.errors.address
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">درباره من </label>
                            </div>
                            <div className="col-md-9">
                              <textarea
                                className="form-control"
                                style={{ resize: "none" }}
                                {...formik.getFieldProps("about")}
                                rows={8}
                                placeholder=""
                              ></textarea>
                              <span className="text-danger">
                                {formik.touched.about && formik.errors.about
                                  ? formik.errors.about
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-center">
                        {isLoading && <SpinnerBtn />}
                        {!isLoading && (
                          <button
                            type="submit"
                            className="btn btn-main-primary"
                          >
                            ذخیره{" "}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="card">
                    <form
                      action=""
                      className="form-horizontal"
                      onSubmit={formikPassword.handleSubmit}
                    >
                      <div className="card-body">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">
                                کلمه عبور جاری
                              </label>
                            </div>
                            <div className="col-md-9">
                              <input
                                className="form-control"
                                {...formikPassword.getFieldProps("oldPassword")}
                                placeholder="کلمه عبور خود را وارد کنید"
                                type="password"
                              />
                              <span className="text-danger">
                                {formikPassword.touched.oldPassword &&
                                formikPassword.errors.oldPassword
                                  ? formikPassword.errors.oldPassword
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">
                                کلمه عبور جدید
                              </label>
                            </div>
                            <div className="col-md-9">
                              <input
                                className="form-control"
                                {...formikPassword.getFieldProps("newPassword")}
                                placeholder="کلمه عبور جدید خود را وارد کنید"
                                type="password"
                              />
                              <span className="text-danger">
                                {formikPassword.touched.newPassword &&
                                formikPassword.errors.newPassword
                                  ? formikPassword.errors.newPassword
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-3">
                              <label className="form-label">
                                تکرار کلمه عبور جدید
                              </label>
                            </div>
                            <div className="col-md-9">
                              <input
                                className="form-control"
                                {...formikPassword.getFieldProps(
                                  "confirmPassword"
                                )}
                                placeholder="تکرار کلمه عبور جدید خود را وارد کنید"
                                type="password"
                              />
                              <span className="text-danger">
                                {formikPassword.touched.confirmPassword &&
                                formikPassword.errors.confirmPassword
                                  ? formikPassword.errors.confirmPassword
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-center">
                        {isLoading ? (
                          <SpinnerBtn />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-main-primary"
                          >
                            بروزرسانی کلمه عبور
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispath: (params: any) => void) => {
  return {
    setUser: (user: any) => dispath(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
