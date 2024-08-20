export default function NotFound() {
  return (
    <div className="card">
      <div className="card-header">خطای 404</div>
      <div className="card-body">
        <p>صفحه ای که به دنبال آن هستید پیدا نشد</p>
      </div>
      <div className="card-footer">
        <a
          href="#"
          onClick={(e) => backButton(e)}
          className="btn btn-primary btn-sm"
        >
          برگشت
        </a>
      </div>
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
