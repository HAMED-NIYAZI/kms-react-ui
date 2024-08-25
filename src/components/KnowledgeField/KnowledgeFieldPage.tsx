import { useEffect, useState } from "react";
import KnowledgeFieldService from "../../services/KnowledgeFieldService";
import SingleSelectTreeComponent from "./SingleSelectTreeComponent";
import { toast } from "react-toastify";
import SpinnerGrid from "../Spinner/Spinner_Grid";

export default function KnowledgeFieldPage() {
  const [tree_data, setTree_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleSelectValue, setSingleSelectValue] = useState<string>('');

  async function handleDelete(id: string, name: string) {//حذف ایتم انتخاب شده
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
    }
  }
  async function handleGetSingleSelectValue(id: string) {//دریافت کد انتخاب شده
    setSingleSelectValue(id);
    console.log(singleSelectValue);
  }
async function handleReload() {//بروزرسانی تری
  console.log('index added')
  index();
}
  const index = async () => {//دریافت اطلاعات تری =پرکردن تری
    setLoading(true);

    try {
      console.log("start");
      const response = await KnowledgeFieldService.getKnowledgeFieldTree();
      if (response.data.result == 0) {
        console.log("finished");
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
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-lg-12">
          <div className="row pad"></div>
          {loading ? 
              <div className="col-xl-12">
              <div className="card">
          <SpinnerGrid/>
          </div>
          </div>

           :<SingleSelectTreeComponent  
            tree_name="KnowledgeFieldForKnowledgeFieldPage"
            tree_caption="فیلدهای دانش"
            tree_data={tree_data}
            onDelete={handleDelete}
            onReload={handleReload}
            onGetSingleSelectValue={handleGetSingleSelectValue}
          />}


        </div>
      </div>
    </>
  );
}
