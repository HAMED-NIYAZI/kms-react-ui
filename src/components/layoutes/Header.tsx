import { useState } from "react";
import { connect } from "react-redux";
import { logoutAction } from "../../store/actions/user-actions";
import { useNavigate } from "react-router-dom";

function Header({ logout, user }: { logout: () => void; user: any }) {
  const navigate = useNavigate();
  const [isShowProfileItem, setIsShowProfileItem] = useState(false);
  const logoutFromDashboard = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="main-header sticky side-header nav nav-item">
      <div className="container-fluid">
        <div className="main-header-left ">
          <div className="responsive-logo">
            <a href="index.html">
              <img
                src="assets/img/brand/logo.png"
                className="logo-1"
                alt="لوگو"
              />
            </a>
            <a href="index.html">
              <img
                src="assets/img/brand/logo-white.png"
                className="dark-logo-1"
                alt="لوگو"
              />
            </a>
            <a href="index.html">
              <img
                src="assets/img/brand/favicon.png"
                className="logo-2"
                alt="لوگو"
              />
            </a>
            <a href="index.html">
              <img
                src="assets/img/brand/favicon.png"
                className="dark-logo-2"
                alt="لوگو"
              />
            </a>
          </div>
          <div className="app-sidebar__toggle" data-bs-toggle="sidebar">
            <a className="open-toggle" href="#">
              <i className="header-icon fe fe-align-left"></i>
            </a>
            <a className="close-toggle" href="#">
              <i className="header-icons fe fe-x"></i>
            </a>
          </div>
          {/* <div className="main-header-center mr-3 d-sm-none d-md-none d-lg-block">
            <input
              className="form-control"
              placeholder="هر چیزی را جستجو کنید ..."
              type="search"
            />
            <button className="btn">
              <i className="fas fa-search d-none d-md-block"></i>
            </button>
          </div> */}
        </div>
        <div className="main-header-right">
          <div className="nav nav-item  navbar-nav-right ml-auto">
            <div className="nav-link" id="bs-example-navbar-collapse-1">
              <form className="navbar-form" role="search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="جستجو کردن"
                  />
                  <span className="input-group-btn">
                    <button type="reset" className="btn btn-default">
                      <i className="fas fa-times"></i>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-default nav-link resp-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </button>
                  </span>
                </div>
              </form>
            </div>
            <div className="nav-item full-screen fullscreen-button">
              <a className="new nav-link full-screen-link" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-icon-svgs"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </a>
            </div>
            <div className="dropdown main-profile-menu nav nav-item nav-link">
              <a
                className="profile-user d-flex"
                href="#"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setIsShowProfileItem((o) => !o);
                }}
              >
                <img
                  alt=""
                  src={`https://freelancework.ir/${user.imagePath}`}
                />
              </a>
              {isShowProfileItem && (
                <div className="dropdown-menu d-block">
                  <div className="main-header-profile bg-primary p-3">
                    <div className="d-flex wd-100p">
                      <div className="main-img-user">
                        <img
                          alt=""
                          src={`https://freelancework.ir/${user.imagePath}`}
                          className=""
                        />
                      </div>
                      <div className="ms-3 my-auto">
                        <h6>{`${user.firstName} ${user.lastName}`}</h6>
                        {/* <span>مدیریت</span> */}
                      </div>
                    </div>
                  </div>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user-circle"></i>مشخصات
                  </a>
                  {/* <a className="dropdown-item" href="#">
                    <i className="bx bx-cog"></i> ویرایش نمایه
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bx bxs-inbox"></i>صندوق ورودی
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-envelope"></i>پیام ها
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-slider-alt"></i> تنظیمات حساب
                  </a> */}
                  <a
                    onClick={() => logoutFromDashboard()}
                    className="dropdown-item"
                    href="#"
                  >
                    <i className="bx bx-log-out"></i> خروج از سیستم
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
