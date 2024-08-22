import { NavLink } from "react-router-dom";

interface Props {
  BreadList: Bread[];
}

export interface Bread {
  Title: string;
  Address: string;
}
export default function BreadCrumb({ BreadList }: Props) {
  return (
    <div className="breadcrumb-header justify-content-between">
      <div className="my-auto">
        <div className="d-flex">
          <h4 className="content-title mb-0 my-auto">{BreadList[0].Title}</h4>
          {BreadList.slice(1).map((b, index) => (
            <NavLink
              className="text-muted mt-1 tx-13 ms-2 mb-0"
              key={index}
              to={b.Address}
            >
              / {b.Title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
