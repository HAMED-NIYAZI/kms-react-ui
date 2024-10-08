import { useEffect, useState } from "react";
import GradeService from "../../services/GradeService";
import { NavLink } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
interface GradesModel {
  id: string;
  gradeName: string;
  sortingNumber: number;
}
export default function GradeList() {
  const [grades, setGrades] = useState<GradesModel[]>([]);

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
    let originalgrades = { ...grades };

    try {
      setGrades(grades.filter((g) => g.id != id));
      const response = await GradeService.delete(id);
      if (response.data.result == 0) {
        toast.success(response.data.message);
        index();
      } else {
        setGrades({ ...originalgrades });
        toast.warn(response.data.message);
      }
    } catch (err) {
      setGrades({ ...originalgrades });
      toast.error((err as AxiosError).message);
    }
  }
  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "پایه تحصیلی", Address: "/grades" },
        ]}
      />
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0">لیست پایه تحصیلی</h4>
                <div className="d-flex flex-row-reverse">
                  <button
                    onClick={index}
                    type="button"
                    className="btn btn-success btn-icon m-2"
                    title="بروزرسانی"
                  >
                    <i className="mdi mdi-refresh" title="بروزرسانی"></i>
                  </button>
                  <NavLink
                    to={"/grades/create"}
                    className="btn btn-success btn-icon m-2"
                    title="ایجاد پایه تحصیلی "
                  >
                    <i className="fa fa-plus" title="ایجاد پایه تحصیلی "></i>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                {grades.length ? (
                  <table
                    className="table table-striped mg-b-0 text-md-nowrap table-hover"
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
                          <tr key={grade?.gradeName}>
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
                                <i className="fa fa-trash text-danger mx-3"></i>
                              </a>
                              <NavLink
                                to={"/grades/edit/" + grade.id}
                                className="mx-2"
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
                  <div className="alert alert-info">
                    هیچ گونه دیتایی برای نمایش پیدا نشد
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
