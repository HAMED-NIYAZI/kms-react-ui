import { useEffect, useState } from "react";
import OrganizationService from "../../services/OrganizationService";
import SpinnerGrid from "../Spinner/Spinner_Grid";
import TreeSingleSelect from "../Tree/TreeSingleSelect";
export default function OrganizationTree({ tree_name }: { tree_name: string }) {
  const [loading, setLoading] = useState(false);
  const [trees, setTrees] = useState([]);

  const index = async () => {
    let trs = [
      {
        id: "27fb51de-ecc5-42ab-85bd-344300ec0a30",
        sortingNumber: 0,
        persianTitle: "fsdfsdf",
        isSelected: false,
        parentId: null,
        children: [],
      },
      {
        id: "dee564e8-0c8d-4b25-a1c0-708edd3c9f95",
        sortingNumber: 0,
        persianTitle: "وزارت ارتباطات و فناوری اطلاعات",
        isSelected: false,
        parentId: null,
        children: [],
      },
      {
        id: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
        sortingNumber: 1,
        persianTitle: "وزارت اطلاعات",
        isSelected: false,
        parentId: null,
        children: [
          {
            id: "3d579aaf-4c4c-447c-8356-11dbf0555cad",
            sortingNumber: 0,
            persianTitle: "سازمان ب 0 ",
            isSelected: false,
            parentId: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
            children: [],
          },
          {
            id: "9a2f4534-4dfb-4bca-a3cb-051831c6c814",
            sortingNumber: 1,
            persianTitle: "سازمان الف",
            isSelected: false,
            parentId: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
            children: [],
          },
          {
            id: "9b486d7b-037c-4b95-ae83-9c071f963cb9",
            sortingNumber: 2,
            persianTitle: "بخش امنیتی",
            isSelected: false,
            parentId: "79a32549-6bfe-40fa-b2e2-210cd327bd34",
            children: [],
          },
        ],
      },
      {
        id: "9cf321b8-a481-4078-954e-04ef42e3be9e",
        sortingNumber: 1,
        persianTitle: "aaa",
        isSelected: false,
        parentId: null,
        children: [
          {
            id: "5ece808b-1f21-4e72-a498-50e3b622e500",
            sortingNumber: 2,
            persianTitle: "bbb",
            isSelected: false,
            parentId: "9cf321b8-a481-4078-954e-04ef42e3be9e",
            children: [],
          },
        ],
      },
    ];
    setTrees(trs);
    return;
    setLoading(true);

    try {
      const response = await OrganizationService.getOrganizationTree();
      if (response.data.result == 0) {
        setTrees(response.data.data);
      } else if (response.data.result == 5) {
        // toast.warning(response.data.message, {
        //   timeout: 2000,
        // });
      } else {
        // toast.warning(response.data.message, {
        //   timeout: 2000,
        // });
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
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header pb-0">
          <div className="d-flex justify-content-between">
            <h4
              className="card-title mg-b-0"
              style={{ paddingTop: "10px!important" }}
            >
              سازمان ها
            </h4>
            <div className="d-flex gap-1"></div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              {loading && <SpinnerGrid />}
              {!loading && (
                <div>
                  <TreeSingleSelect trees={trees} tree_name={tree_name} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
