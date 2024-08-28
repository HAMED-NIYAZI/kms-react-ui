import { useEffect, useState } from "react";
import SpinnerBtn from "../Spinner/Spinner_btn";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import KnowledgeFieldService from "../../services/KnowledgeFieldService";
import { toast } from "react-toastify";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import TreeModalSingleSelect from "./TreeModalSingleSelect";

export default function KnowledgeFieldEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLloading] = useState(false);
  let parentId: string = "";
  const [parentName, setParentName] = useState<string>("");
  let tree_name: string = "modeleditknowledgeField";
  const [tree_data_KnowledgeFields, setTree_data_KnowledgeFields] = useState(
    []
  );

  function handleGetSingleSelectValue(id: string, name: string): void {
    //دریافت کد انتخاب شده

    setParentName(name);
    parentId = id;
  }

  async function handleBack() {
    setParentName("");

    navigate("/KnowledgeFieldPage");
  }
  async function handleReload() {
    if (params.id) {
      getById(params.id);
    }

    $(".checkbox_" + tree_name).prop("checked", false);
    setParentName("");
    parentId = "";
  }

  const formik = useFormik({
    initialValues: {
      id: "",
      persianTitle: "",
      sortingNumber: "",
      parentId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLloading(true);
      try {
        const response = await OrganizationService.update(values);
        if (response.data.result === 0) {
          resetForm();
          toast.success(response.data.message);
          navigate("/KnowledgeFieldPage");
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
      } finally {
        setLloading(false);
      }
    },
    validationSchema: Yup.object({
      persianTitle: Yup.string()
        .required("پرکردن این فیلد الزامیست")
        .max(50, "حداکثر 50 کارکتر وارد کنید"),
      sortingNumber: Yup.number().required("پرکردن این فیلد الزامیست"),
      parentId: Yup.string().nullable(),
    }),
  });

  async function getById(id: string) {
    try {
      const response = await KnowledgeFieldService.getById(id);
      formik.setValues({ ...response.data.data });
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    if (params.id) {
      getById(params.id);
    }
  }, []);

  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "فیلد دانش", Address: "/KnowledgeFieldPage" },
          {
            Title: "ویرایش فیلد دانش",
            Address: "/KnowledgeFieldPage/Edit/" + params.id,
          },
        ]}
      />
      <div className="col-xl-12">
        {loading === false && (
          <form onSubmit={formik.handleSubmit}>
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0">ویرایش فیلد دانش</h4>
                  <NavLink
                    to={"/KnowledgeFieldPage"}
                    className=" btn btn-primary btn-sm"
                  >
                    <i className="fa  fa-arrow-left"></i>
                  </NavLink>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label>نام فیلد دانش</label>
                      <input
                        className="form-control"
                        placeholder="نام سازمان را وارد کنید"
                        type="text"
                        {...formik.getFieldProps("persianTitle")}
                      />
                      <span className="text-danger">
                        {formik.touched.persianTitle &&
                        formik.errors.persianTitle
                          ? formik.errors.persianTitle
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label>اولویت نمایش</label>
                      <select
                        className="form-control"
                        {...formik.getFieldProps("sortingNumber")}
                      >
                        {[
                          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                          17, 18, 19, 20,
                        ].map((i) => (
                          <option value={i}>{i}</option>
                        ))}
                      </select>
                      <span className="text-danger">
                        {formik.touched.sortingNumber &&
                        formik.errors.sortingNumber
                          ? formik.errors.sortingNumber
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-12"
                    style={{
                      padding: "0px",
                    }}
                  >
                    <label
                      htmlFor="parentName"
                      style={{
                        padding: "0.75rem",
                      }}
                    >
                      سرشاخه
                    </label>
                    <div className="row">
                      <div className="col-8">
                        <input
                          id="parentName"
                          className="form-control"
                          disabled={true}
                          value={parentName}
                          type="text"
                        />
                      </div>
                      <div className="col-1">
                        <TreeModalSingleSelect
                          tree_name={tree_name}
                          tree_data={tree_data_KnowledgeFields}
                          onReload={handleReload}
                          tree_caption="انتخاب سرشاخه"
                          onGetSingleSelectValue={handleGetSingleSelectValue}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                {loading ? (
                  <SpinnerBtn />
                ) : (
                  <button type="submit" className="btn btn-warning btn-sm">
                    ذخیره
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
