import { useEffect, useLayoutEffect, useState } from "react";
import SpinnerBtn from "../Spinner/SpinnerBtn";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrganizationService from "../../services/OrganizationService";
import { toast } from "react-toastify";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import TreeModalSingleSelect from "../KnowledgeField/TreeModalSingleSelect";
import { useLocation } from 'react-router-dom';
import ChartService from "../../services/ChartService";

function ChartCreate() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data_selectOrganization, setdata_selectOrganization] = useState([]);
  const [organizationName, setorganizationName] = useState('');
  const [organizationId, setorganizationId] = useState('');

  const [data_selectChartParent, setdata_selectChartParent] = useState([]);
  const [ChartParentName, setChartParentName] = useState('');
  const [ChartParentId, setChartParentId] = useState('');

  const location = useLocation();
  const { selectedOrganizationId, selectedOrganizationName } = location.state;

  
  const formik = useFormik({
    initialValues: {
      persianTitle: "",
      sortingNumber: 0,
      parentId: "",
      organizationId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
       values.parentId =ChartParentId;
   values.organizationId = organizationId;
   console.log(organizationId);

        const response = await ChartService.create(values);
        if (response.data.result === 0) {
          resetForm();
          toast.success(response.data.message);
          navigate("/charts");
        } else {
          toast.warning(response.data.message);
        }
      } catch (err:any) {
        toast.error(err);

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
      organizationId: Yup.string().nullable(),
    }),
  });



  const getOrganizationTree = async () => {
    try {
      const response = await OrganizationService.getOrganizationTree();
      if (response.data.result == 0) {
        setdata_selectOrganization(response.data.data);
        console.log(response.data.data);
      } else if (response.data.result == 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
    } finally {
    }
  };



  const getChartParentTree = async () => {
    try {
      const respon = await ChartService.getOrganizationChartTree(selectedOrganizationId);
      if (respon.data.result == 0) {
        setdata_selectChartParent(respon.data.data);
        console.log(respon.data.data);
      } else if (respon.data.result == 5) {
        toast.warning(respon.data.message);
      } else {
        toast.warning(respon.data.message);
      }
    } catch (err) {
    } finally {
    }
  };



  function handleGetSingleSelectValue_Organization(
    id: string,
    name: string
  ): void {
    setorganizationName(name);
    setorganizationId(id);
  }
  function handleGetSingleSelectValue_ChartParent(
    id: string,
    name: string
  ): void {
     setChartParentName(name);
    setChartParentId(id);
   }

  useEffect(() => {
    getOrganizationTree();
    setorganizationId(selectedOrganizationId);
    setorganizationName(selectedOrganizationName);
    getChartParentTree();
  }, []);

  useLayoutEffect(() => {
  }, []);
  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "چارت ها", Address: "/charts" },
          { Title: "ایجاد چارت", Address: "/charts/create" },
        ]}
      />

      <div className="col-xl-12">
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0">ایجاد چارت </h4>
                <NavLink to={"/charts"} className=" btn btn-primary btn-icon">
                  <i className="fa  fa-arrow-left"></i>
                </NavLink>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="persianTitle">نام چارت</label>
                    <input
                      id="persianTitle"
                      className="form-control"
                      placeholder="نام چارت را وارد کنید"
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
                <div className="col-lg-6">
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
                    htmlFor="organizationName"
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    سرشاخه
                  </label>
                  <div className="row">
                    <div className="col-10">
                      <input
                        id="organizationName"
                        className="form-control"
                        disabled={true}
                        value={ChartParentName}
                        type="text"
                      />
                    </div>
                    <div className="col-1">
                      <TreeModalSingleSelect
                      key={10}
                        tree_caption="انتخاب سرشاخه"
                        tree_name="selectChartParentmmmmmmmmmmmmmmmmmmmmmmmmmm"
                        tree_data={data_selectChartParent}
                        onReload={() => {
                          console.log('selectChartParentmmmmmmmmmmmmmmmmmmmmmmmmmm');
                          console.log(data_selectChartParent);
                           const originalDataChartParent = [...data_selectChartParent];
                          setdata_selectChartParent([]);
                          setChartParentId('');
                          setChartParentName('');
                           setTimeout(() => {
                            setdata_selectChartParent(originalDataChartParent);
                          }, 100);
                        }}
                        onGetSingleSelectValue={
                          handleGetSingleSelectValue_ChartParent
                        }
                      />
                    </div>
                  </div>
                </div>





                <div
                  className="col-12"
                  style={{
                    padding: "0px",
                  }}
                >
                  <label
                    htmlFor="organizationName"
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    سازمان
                  </label>
                  <div className="row">
                    <div className="col-10">
                      <input
                        id="organizationName"
                        className="form-control"
                        disabled={true}
                        value={organizationName}
                        type="text"
                      />
                    </div>
                    <div className="col-1">
                      <TreeModalSingleSelect
                        tree_caption="انتخاب سازمان"
                        tree_name="selectOrganization"
                        tree_data={data_selectOrganization}
                        onReload={() => {
                          const originalData = [...data_selectOrganization];
                          setdata_selectOrganization([]);
                          setorganizationId('');
                          setorganizationName('');
                           setTimeout(() => {
                            setdata_selectOrganization(originalData);
                          }, 100);
                        }}
                        onGetSingleSelectValue={
                          handleGetSingleSelectValue_Organization
                        }
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
                <button type="submit" className="btn btn-primary">
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

export default ChartCreate;
