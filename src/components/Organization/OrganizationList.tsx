import Master from "../Layoutes/Master";
import OrganizationTree from "./OrganizationTree";
import { NavLink } from "react-router-dom";

export default function OrganizationList() {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
 
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
    </>
  );
}
