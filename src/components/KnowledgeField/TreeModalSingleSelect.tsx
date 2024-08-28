import { useEffect, useState } from "react";
import SingleSelectTreeComponent from "./SingleSelectTreeComponent";

export default function TreeModalSingleSelect({
  tree_name,
  tree_caption,
  tree_data,
  onReload,
  onGetSingleSelectValue,
}: Readonly<{
  tree_name: string;
  tree_caption?: string;
  tree_data: any[];
  onReload: () => void;
  onGetSingleSelectValue: (id: string) => void;
}>) {
  const [loadingParent, setLoadingParent] = useState(false);
  let localParent: string = "";
  const [tree_data_KnowledgeFields, setTree_data_KnowledgeFields] = useState(
    []
  );

  function handleGetSingleSelectValue(id: string): string {
    //دریافت کد انتخاب شده
    localParent = id;
    return id;
  }

  async function handleReload() {
    //بروزرسانی تری
    index();
  }

  const index = async () => {
    //دریافت اطلاعات تری =پرکردن تری
    setLoadingParent(true);

    try {
      const response = await KnowledgeFieldService.getKnowledgeFieldTree();
      if (response.data.result == 0) {
        setTree_data_KnowledgeFields([]);
        setTree_data_KnowledgeFields(response.data.data);
      } else if (response.data.result == 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
    } finally {
      setLoadingParent(false);
    }
  };

  useEffect(() => {
    index();
  }, []);

  return (
    <>
      <div>
        <a
          className="btn btn-primary btn-sm"
          data-bs-target="#modal1"
          data-bs-toggle="modal"
          href="#"
        >
          <i className="fa fa-ellipsis-h"></i>
        </a>
      </div>

      <div
        className="modal"
        id="modal1"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content modal-content-demo">
            <div className="modal-header">
              <h6 className="modal-title"> </h6>
              <button
                aria-label="بستن"
                className="close"
                data-bs-dismiss="modal"
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <SingleSelectTreeComponent
                tree_name={tree_name}
                tree_caption={tree_caption}
                tree_data={tree_data}
                onReload={handleReload}
                onGetSingleSelectValue={handleGetSingleSelectValue}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn ripple btn-secondary btn-sm"
                data-bs-dismiss="modal"
                type="button"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
