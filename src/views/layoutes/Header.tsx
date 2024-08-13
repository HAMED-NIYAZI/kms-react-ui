export default function Header() {
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
          {/* <ul className="nav">
            <li className="">
              <div className="dropdown  nav-itemd-none d-md-flex">
                <a
                  href="#"
                  className="d-flex  nav-item country-flag1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="avatar country-Flag me-0 align-self-center bg-transparent">
                    <img src="assets/img/flags/us_flag.jpg" alt="img" />
                  </span>
                  <div className="my-auto">
                    <strong className="me-2 ms-2 my-auto">انگلیسی</strong>
                  </div>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-left dropdown-menu-arrow"
                  x-placement="bottom-end"
                >
                  <a href="#" className="dropdown-item d-flex ">
                    <span className="avatar  m-e-c-3 align-self-center bg-transparent">
                      <img src="assets/img/flags/french_flag.jpg" alt="img" />
                    </span>
                    <div className="d-flex">
                      <span className="mt-2">فرانسوی</span>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex">
                    <span className="avatar  m-e-c-3 align-self-center bg-transparent">
                      <img src="assets/img/flags/germany_flag.jpg" alt="img" />
                    </span>
                    <div className="d-flex">
                      <span className="mt-2">آلمان</span>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex">
                    <span className="avatar  m-e-c-3 align-self-center bg-transparent">
                      <img src="assets/img/flags/italy_flag.jpg" alt="img" />
                    </span>
                    <div className="d-flex">
                      <span className="mt-2">ایتالیا</span>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex">
                    <span className="avatar  m-e-c-3 align-self-center bg-transparent">
                      <img src="assets/img/flags/russia_flag.jpg" alt="img" />
                    </span>
                    <div className="d-flex">
                      <span className="mt-2">روسیه</span>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item d-flex">
                    <span className="avatar  m-e-c-3 align-self-center bg-transparent">
                      <img src="assets/img/flags/spain_flag.jpg" alt="img" />
                    </span>
                    <div className="d-flex">
                      <span className="mt-2">اسپانیا</span>
                    </div>
                  </a>
                </div>
              </div>
            </li>
          </ul> */}
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
            {/* <div className="dropdown nav-item main-header-message ">
              <a className="new nav-link" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-icon-svgs"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className=" pulse-danger"></span>
              </a>
              <div className="dropdown-menu">
                <div className="menu-header-content bg-primary text-right">
                  <div className="d-flex">
                    <h6 className="dropdown-title mb-1 tx-15 text-white font-weight-semibold">
                      پیام ها
                    </h6>
                    <span className="badge rounded-pill bg-warning ms-auto my-auto float-end">
                      علامت گذاری همه
                    </span>
                  </div>
                  <p className="dropdown-title-text subtext mb-0 text-white op-6 pb-0 tx-12 ">
                    شما 4 پیام خوانده نشده دارید
                  </p>
                </div>
                <div className="main-message-list chat-scroll">
                  <a href="#" className="p-3 d-flex border-bottom">
                    <div
                      className="  drop-img  cover-image  "
                      data-bs-image-src="assets/img/faces/3.jpg"
                    >
                      <span className="avatar-status bg-teal"></span>
                    </div>
                    <div className="wd-90p">
                      <div className="d-flex">
                        <h5 className="mb-1 name">پتی کروزر</h5>
                      </div>
                      <p className="mb-0 desc">
                        متاسفم اما مطمئن نیستم که چگونه به شما در این زمینه کمک
                        کنم ......
                      </p>
                      <p className="time mb-0 text-left float-right mr-2 mt-2">
                        15 مهر 3:55 بعد از ظهر
                      </p>
                    </div>
                  </a>
                  <a href="#" className="p-3 d-flex border-bottom">
                    <div
                      className="drop-img cover-image"
                      data-bs-image-src="assets/img/faces/2.jpg"
                    >
                      <span className="avatar-status bg-teal"></span>
                    </div>
                    <div className="wd-90p">
                      <div className="d-flex">
                        <h5 className="mb-1 name">جیمی چانگا</h5>
                      </div>
                      <p className="mb-0 desc">
                        همه آماده! اکنون وقت آن است که اکنون به سراغ شما بروم
                        ......
                      </p>
                      <p className="time mb-0 text-left float-right mr-2 mt-2">
                        مهر 06 01:12 صبح
                      </p>
                    </div>
                  </a>
                  <a href="#" className="p-3 d-flex border-bottom">
                    <div
                      className="drop-img cover-image"
                      data-bs-image-src="assets/img/faces/9.jpg"
                    >
                      <span className="avatar-status bg-teal"></span>
                    </div>
                    <div className="wd-90p">
                      <div className="d-flex">
                        <h5 className="mb-1 name">گراهام کراکر</h5>
                      </div>
                      <p className="mb-0 desc">
                        آیا آماده تحویل کالا هستید ...
                      </p>
                      <p className="time mb-0 text-left float-right mr-2 mt-2">
                        25 مهر 10:35 صبح
                      </p>
                    </div>
                  </a>
                </div>
                <div className="text-center dropdown-footer">
                  <a href="#">مشاهده همه</a>
                </div>
              </div>
            </div> */}
            {/* <div className="dropdown nav-item main-header-notification">
              <a className="new nav-link" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-icon-svgs"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className=" pulse"></span>
              </a>
              <div className="dropdown-menu">
                <div className="menu-header-content bg-primary text-right">
                  <div className="d-flex">
                    <h6 className="dropdown-title mb-1 tx-15 text-white font-weight-semibold">
                      اطلاعیه
                    </h6>
                    <span className="badge rounded-pill bg-warning ms-auto my-auto float-end">
                      علامت گذاری همه
                    </span>
                  </div>
                  <p className="dropdown-title-text subtext mb-0 text-white op-6 pb-0 tx-12 ">
                    شما 4 اعلان خوانده نشده دارید
                  </p>
                </div>
                <div className="main-notification-list Notification-scroll">
                  <a className="d-flex p-3 border-bottom" href="#">
                    <div className="notifyimg bg-pink">
                      <i className="la la-file-alt text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="notification-label mb-1">
                        پرونده های جدید موجود است
                      </h5>
                      <div className="notification-subtext">10 ساعت پیش</div>
                    </div>
                    <div className="mr-auto">
                      <i className="las la-angle-left text-left text-muted"></i>
                    </div>
                  </a>
                  <a className="d-flex p-3" href="#">
                    <div className="notifyimg bg-purple">
                      <i className="la la-gem text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="notification-label mb-1">
                        به روزرسانی های موجود
                      </h5>
                      <div className="notification-subtext">2 روز قبل</div>
                    </div>
                    <div className="mr-auto">
                      <i className="las la-angle-left text-left text-muted"></i>
                    </div>
                  </a>
                  <a className="d-flex p-3 border-bottom" href="#">
                    <div className="notifyimg bg-success">
                      <i className="la la-shopping-basket text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="notification-label mb-1">
                        سفارش جدید دریافت شد
                      </h5>
                      <div className="notification-subtext">1 ساعت پیش</div>
                    </div>
                    <div className="mr-auto">
                      <i className="las la-angle-left text-left text-muted"></i>
                    </div>
                  </a>
                  <a className="d-flex p-3 border-bottom" href="#">
                    <div className="notifyimg bg-warning">
                      <i className="la la-envelope-open text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="notification-label mb-1">
                        بررسی جدید دریافت شد
                      </h5>
                      <div className="notification-subtext">1 روز پیش</div>
                    </div>
                    <div className="mr-auto">
                      <i className="las la-angle-left text-left text-muted"></i>
                    </div>
                  </a>
                  <a className="d-flex p-3 border-bottom" href="#">
                    <div className="notifyimg bg-danger">
                      <i className="la la-user-check text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="notification-label mb-1">
                        22 ثبت نام تایید شده
                      </h5>
                      <div className="notification-subtext">2 ساعت پیش</div>
                    </div>
                    <div className="mr-auto">
                      <i className="las la-angle-left text-left text-muted"></i>
                    </div>
                  </a>
                  <a className="d-flex p-3 border-bottom" href="#">
                    <div className="notifyimg bg-primary">
                      <i className="la la-check-circle text-white"></i>
                    </div>
                    <div className="ms-3">
                      <h5 className="notification-label mb-1">
                        پروژه تصویب شده است
                      </h5>
                      <div className="notification-subtext">4 ساعت پیش</div>
                    </div>
                    <div className="mr-auto">
                      <i className="las la-angle-left text-left text-muted"></i>
                    </div>
                  </a>
                </div>
                <div className="dropdown-footer">
                  <a href="#">مشاهده همه</a>
                </div>
              </div>
            </div> */}
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
              <a className="profile-user d-flex" href="#">
                <img alt="" src="assets/img/faces/6.jpg" />
              </a>
              <div className="dropdown-menu">
                <div className="main-header-profile bg-primary p-3">
                  <div className="d-flex wd-100p">
                    <div className="main-img-user">
                      <img alt="" src="assets/img/faces/6.jpg" className="" />
                    </div>
                    <div className="ms-3 my-auto">
                      <h6>پتی کروزر</h6>
                      <span>مدیریت</span>
                    </div>
                  </div>
                </div>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-user-circle"></i>مشخصات
                </a>
                <a className="dropdown-item" href="#">
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
                </a>
                <a className="dropdown-item" href="signin.html">
                  <i className="bx bx-log-out"></i> خروج از سیستم
                </a>
              </div>
            </div>
            {/* <div className="dropdown main-header-message right-toggle">
              <a
                className="nav-link pe-0"
                data-bs-toggle="sidebar-left"
                data-bs-target=".sidebar-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="header-icon-svgs"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
