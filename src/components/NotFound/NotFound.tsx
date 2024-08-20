export default function NotFound() {
  return (
    <div
      className="main-error-wrapper page page-h"
      style={{ background: "#d9e8fc" }}
    >
      <img src="assets/img/media/404.png" className="error-page" alt="error" />
      <h2> صفحه ای که به دنبال آن هستید وجود ندارد.</h2>
      <a
        className="btn btn-outline-danger"
        href="#"
        onClick={(e) => backButton(e)}
      >
        بازگشت
      </a>
    </div>
  );
}

export const backButton = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  e.stopPropagation;
  e.preventDefault;
  window.history.go(-1);
};
