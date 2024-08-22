import { useEffect, useState } from "react";
import GradeService from "../../services/GradeService";
import { NavLink } from "react-router-dom";
import Master from "../Layoutes/Master";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

export default function GradeList() {
  const [grades, setGrades] = useState([]);

  async function index() {
    const response = await GradeService.index();
    setGrades(response.data.data);
  }

  useEffect(() => {
    index();
  }, []);

  async function deleteGrade(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) {
    e.preventDefault();

    if (!confirm("آیا مایل به حذف کردن هستید؟")) {
      return;
    }

    const response = await GradeService.delete(id);
    if (response.data.result == 0) {
      // toast.success(response.data.message);
      index();
    } else if (response.data.result == 5) {
      // toast.warning(response.data.message, {
      //   timeout: 2000,
      // });
    } else {
      // toast.warning(response.data.message, {
      //   timeout: 2000,
      // });
    }
  }
  return (
    <Master>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "پایه تحصیلی", Address: "/grades" },
        ]}
      />
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0">لیست پایه تحصیلی</h4>
                <button
                  onClick={index}
                  type="button"
                  className="btn btn-success btn-icon"
                >
                  <i className="mdi mdi-refresh"></i>
                </button>
                <NavLink
                  to={"/grades/create"}
                  className="btn btn-success btn-sm"
                >
                  <i className="fa fa-plus"></i>
                </NavLink>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                {grades.length ? (
                  <table
                    className="table table-striped mg-b-0 text-md-nowrap table-hover"
                    v-if="grades.length"
                  >
                    <thead>
                      <tr>
                        <th>ردیف</th>
                        <th>عنوان</th>
                        <th>اولویت نمایش</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade: any, index: number) => {
                        return (
                          <tr>
                            <th scope="row">{1 + index}</th>
                            <td>{grade?.gradeName}</td>
                            <td>
                              <span className="badge bg-info">
                                {grade?.sortingNumber}
                              </span>
                            </td>
                            <td>
                              <a
                                href="#"
                                onClick={(e) => deleteGrade(e, grade.id)}
                              >
                                <i className="fa fa-trash text-danger mr-10"></i>
                              </a>
                              <NavLink
                                to={"/grades/edit/" + grade.id}
                                className="ms-2"
                              >
                                <i className="fa fa-pen text-warning"></i>
                              </NavLink>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="alert alert-info" v-else>
                    هیچ گونه دیتایی برای نمایش پیدا نشد
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}
