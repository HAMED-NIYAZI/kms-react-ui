import Master from "../Layoutes/Master";
import OrganizationTree from "./OrganizationTree";
import { NavLink } from "react-router-dom";

export default function OrganizationList() {
  return (
    <Master>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="breadcrumb-header justify-content-between">
        <div className="my-auto">
          <div className="d-flex">
            <h4 className="content-title mb-0 my-auto">
              <NavLink
                to={"/organizations"}
                className="content-title mb-0 my-auto"
              >
                سازمان ها
              </NavLink>
            </h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="row pad">
            <NavLink
              to={"organizations/create"}
              className="btn btn-success btn-icon"
              title="ایجاد سازمان"
            >
              <i className="fa fa-plus"></i>
            </NavLink>
          </div>
          <OrganizationTree tree_name="OrganizationViewList" />
        </div>
      </div>
    </Master>
  );
}
