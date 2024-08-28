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
  onGetSingleSelectValue: (id: string, name: string) => void;
}>) {
  let localParent: string = "";

  function handleGetSingleSelectValue(id: string, name: string): string {
    //دریافت کد انتخاب شده
    localParent = id;
    onGetSingleSelectValue(id, name);

    return id;
  }

  async function handleReload() {
    //بروزرسانی تری
    // index();
    onReload();
  }

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <button
          className="btn btn-primary btn-icon"
          data-bs-target="#modal1"
          data-bs-toggle="modal"
        >
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>

      <div
        className="modal"
        id="modal1"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
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
