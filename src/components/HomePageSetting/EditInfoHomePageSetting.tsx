import SpinnerBtn from "../Spinner/SpinnerBtn";

export default function EditInfoHomePageSetting() {
  return (
    <div className="row">
      <div className="col-xl-12 col-md-12">
        <div className="card mg-b-20 mg-lg-b-0">
          <div className="card-body p-0">
            <div className="todo-widget-header  pb-2 pd-20">
              <h5
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                اطلاعات صفحه نخست{" "}
              </h5>
              <form>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label className="form-label">عنوان </label>
                    </div>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="عنوان"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-md-2">
                      <label className="form-label">توضیحات</label>
                    </div>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        name="example-textarea-input"
                        placeholder="توضیحات"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
      
               <div className="card-footer">
                <SpinnerBtn   />
                <a
                  style={{ width: "120px" }}
                  className="btn btn-primary"
                  href="#"
                  data-placement="top"
                  data-bs-toggle="tooltip"
                  title="ذخیره"
                  v-else
                //   @click.prevent="updateInfoHomePageSetting"
                  data-bs-original-title="ذخیره"
                >
                  ذخیره
                </a>
              </div>
            </div>
            </div>
            </div>
 
     );
  }
