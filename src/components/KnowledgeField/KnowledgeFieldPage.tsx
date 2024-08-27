import { useEffect, useState } from "react";
import KnowledgeFieldService from "../../services/KnowledgeFieldService";
import SingleSelectTreeComponent from "./SingleSelectTreeComponent";
import { toast } from "react-toastify";
import SpinnerGrid from "../Spinner/Spinner_Grid";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

export default function KnowledgeFieldPage() {
  const [tree_data, setTree_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleDelete(id: string, name: string) {
    //حذف ایتم انتخاب شده
    if (!confirm("آیا مایل به حذف  (" + name + ")  هستید؟")) {
      return;
    }
    try {
      let response = await KnowledgeFieldService.delete(id);

      if (response.data.result == 4) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.result == 0) {
        toast.success("عملیات حذف با موفقیت انجام شد");
        index();
      }
    } catch (err) {
      console.log(err);
    } finally {
      // TODO document why this block is empty
    }
  }

  function handleGetSingleSelectValue(id: string): string {
    //دریافت کد انتخاب شده
    console.log(id);
    return id;
  }
  async function handleReload() {
    //بروزرسانی تری
    index();
  }

  async function handleAdd() {
    //اضافه کردن تری
    alert("rroute to add");
    navigate("/KnowledgeFieldPage/Create");
  }
  async function handleEdit() {
    //اضافه کردن تری
    alert("rroute to edit");
    navigate("/KnowledgeFieldEdit");
  }
  const index = async () => {
    //دریافت اطلاعات تری =پرکردن تری
    setLoading(true);

    try {
      const response = await KnowledgeFieldService.getKnowledgeFieldTree();
      if (response.data.result == 0) {
        setTree_data([]);
        setTree_data(response.data.data);
      } else if (response.data.result == 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    index();
  }, []);

  return (
    <>
      <BreadCrumb BreadList={[{ Title: "فیلدهای دانش", Address: "" }]} />
      <div className="row">
        <div
          className="col-xl-12"
          style={{ paddingRight: "0px", paddingLeft: "0px" }}
        >
          <div className="row pad"></div>
          {loading ? (
            <div className="col-xl-12">
              <div className="card">
                <SpinnerGrid />
              </div>
            </div>
          ) : (
            <SingleSelectTreeComponent
              tree_name="KnowledgeFieldForKnowledgeFieldPage"
              tree_caption="فیلدهای دانش"
              tree_data={tree_data}
              onDelete={handleDelete}
              onReload={handleReload}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onGetSingleSelectValue={handleGetSingleSelectValue}
            />
          )}
        </div>
      </div>
    </>
  );
}
