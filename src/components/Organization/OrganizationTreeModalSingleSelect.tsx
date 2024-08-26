import OrganizationTree from "./OrganizationTree";

function OrganizationTreeModalSingleSelect() {
  let tree_name = "OrganizationViewList_ModalCreate";
  return (
    <>
      <div>
        <a
          className="btn btn-primary btn-sm"
          data-bs-target="#modal1"
          data-bs-toggle="modal"
          href="#"
        >
          <i className="fa fa-ellipsis-h"></i>
        </a>
      </div>

      <div
        className="modal"
        id="modal1"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content modal-content-demo">
            <div className="modal-header">
              <h6 className="modal-title"> </h6>
              <button
                aria-label="بستن"
                className="close"
                data-bs-dismiss="modal"
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <OrganizationTree tree_name={tree_name} />
            </div>
            <div className="modal-footer">
              <button
                className="btn ripple btn-secondary btn-sm"
                data-bs-dismiss="modal"
                type="button"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrganizationTreeModalSingleSelect;
