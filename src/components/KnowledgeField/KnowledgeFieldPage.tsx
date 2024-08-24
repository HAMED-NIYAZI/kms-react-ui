import { useEffect, useState } from "react";
import KnowledgeFieldService from "../../services/KnowledgeFieldService";
import SingleSelectTreeComponent from "./SingleSelectTreeComponent";
import { toast } from "react-toastify";
import SpinnerGrid from "../Spinner/Spinner_Grid";

export default function KnowledgeFieldPage() {
  const [tree_data, setTree_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<number>(1);

  async function handleDelete(id: string, name: string) {
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
async function handleReload() {
  console.log('index added')
  index();
}
  const index = async () => {
    // let trs = [
    //   {
    //     id: "27fb51de-ecc5-42ab-85bd-344300ec0a30",
    //     sortingNumber: 0,
    //     persianTitle: "fsdfsdf",
    //     isSelected: false,
    //     parentId: null,
    //     children: [],
    //   },
    //   {
    //     id: "dee564e8-0c8d-4b25-a1c0-708edd3c9f95",
    //     sortingNumber: 0,
    //     persianTitle: "وزارت ارتباطات و فناوری اطلاعات",
    //     isSelected: false,
    //     parentId: null,
    //     children: [],
    //   },
    //   {
    //     id: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
    //     sortingNumber: 1,
    //     persianTitle: "وزارت اطلاعات",
    //     isSelected: false,
    //     parentId: null,
    //     children: [
    //       {
    //         id: "3d579aaf-4c4c-447c-8356-11dbf0555cad",
    //         sortingNumber: 0,
    //         persianTitle: "سازمان ب 0 ",
    //         isSelected: false,
    //         parentId: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
    //         children: [],
    //       },
    //       {
    //         id: "9a2f4534-4dfb-4bca-a3cb-051831c6c814",
    //         sortingNumber: 1,
    //         persianTitle: "سازمان الف",
    //         isSelected: false,
    //         parentId: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
    //         children: [],
    //       },
    //       {
    //         id: "9b486d7b-037c-4b95-ae83-9c071f963cb9",
    //         sortingNumber: 2,
    //         persianTitle: "بخش امنیتی",
    //         isSelected: false,
    //         parentId: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
    //         children: [],
    //       },
    //     ],
    //   },
    //   {
    //     id: "9cf321b8-a481-4078-954e-04ef42e3be9e",
    //     sortingNumber: 1,
    //     persianTitle: "aaa",
    //     isSelected: false,
    //     parentId: null,
    //     children: [
    //       {
    //         id: "5ece808b-1f21-4e72-a498-50e3b622e500",
    //         sortingNumber: 2,
    //         persianTitle: "bbb",
    //         isSelected: false,
    //         parentId: "9cf321b8-a481-4078-954e-04ef42e3be9e",
    //         children: [],
    //       },
    //     ],
    //   },
    // ];

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
          {loading ? <SpinnerGrid/> :<SingleSelectTreeComponent  
            tree_name="KnowledgeFieldForKnowledgeFieldPage"
            tree_caption="فیلدهای دانش"
            tree_data={tree_data}
            onDelete={handleDelete}
            onReload={handleReload}
          />}


        </div>
      </div>
    </>
  );
}
