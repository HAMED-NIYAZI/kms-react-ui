import { useEffect, useState } from "react";
import SpinnerBtn from "../Spinner/Spinner_btn";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import KnowledgeFieldService from "../../services/KnowledgeFieldService";
import { toast } from "react-toastify";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import SingleSelectTreeComponent from "./SingleSelectTreeComponent";
import SpinnerGrid from "../Spinner/Spinner_Grid";
import TreeModalSingleSelect from "./TreeModalSingleSelect";

export default function KnowledgeFieldCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingParent, setLoadingParent] = useState(false);
  let localParent: string = "";
  const [parentName, setParentName] = useState("");

  let tree_name: string = "modeladdknowledgeField";
  const [tree_data_KnowledgeFields, setTree_data_KnowledgeFields] = useState(
    []
  );
  const formik = useFormik({
    initialValues: {
      persianTitle: "",
      sortingNumber: 0,
      parentId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        values.parentId = localParent;
        const response = await KnowledgeFieldService.create(values);
        if (response.data.result === 0) {
          resetForm();
          toast.success(response.data.message);
          navigate("/KnowledgeFieldPage");
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
      } finally {
        setLoading(false);
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

  function handleGetSingleSelectValue(id: string, name: string): string {
    //دریافت کد انتخاب شده

    // Update the state with the new value
    setParentName(name);

    // Log the new value
    console.log("New parent name:", parentName, "------------", name);
    return id;
  }

  async function handleReload() {
    index();
    $(".checkbox_" + tree_name).prop("checked", false);
  }

  const index = async () => {
    //دریافت اطلاعات تری =پرکردن تری

    try {
      const response = await KnowledgeFieldService.getKnowledgeFieldTree();
      if (response.data.result == 0) {
        // setTree_data_KnowledgeFields([]);
        setTree_data_KnowledgeFields(response.data.data);
      } else if (response.data.result == 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    index();
  }, []);

  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "فیلد دانش", Address: "/KnowledgeFieldPage" },
          {
            Title: "ایجاد فیلد دانش",
            Address: "/KnowledgeFieldPage/Create",
          },
        ]}
      />
      <div className="col-xl-12">
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0">ایجاد فیلد دانش</h4>
                <NavLink
                  to={"/KnowledgeFieldPage"}
                  className="btn btn-primary btn-icon"
                >
                  <i className="fa  fa-arrow-left"></i>
                </NavLink>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group">
                    <label htmlFor="persianTitle">نام فیلد دانش</label>
                    <input
                      id="persianTitle"
                      className="form-control"
                      placeholder="نام فیلد دانش را وارد کنید"
                      type="text"
                      {...formik.getFieldProps("persianTitle")}
                    />
                    <span className="text-danger">
                      {formik.touched.persianTitle && formik.errors.persianTitle
                        ? formik.errors.persianTitle
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="sortingNumber">اولویت نمایش</label>
                    <select
                      id="sortingNumber"
                      className="form-control"
                      {...formik.getFieldProps("sortingNumber")}
                    >
                      {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20,
                      ].map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
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
                      {loadingParent ? (
                        <div className="col-xl-12">
                          <div className="card">
                            <SpinnerGrid />
                          </div>
                        </div>
                      ) : (
                        <TreeModalSingleSelect
                          tree_name={tree_name}
                          tree_data={tree_data_KnowledgeFields}
                          onReload={handleReload}
                          tree_caption="انتخاب سرشاخه"
                          onGetSingleSelectValue={handleGetSingleSelectValue}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              {loading ? (
                <SpinnerBtn />
              ) : (
                <button type="submit" className="btn btn-success btn-sm">
                  ذخیره
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
