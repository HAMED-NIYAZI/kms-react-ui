import { useEffect, useState } from "react";
import OrganizationService from "../../services/OrganizationService";
import Spinner_Grid from "../Spinner/Spinner_Grid";
import TreeSingleSelect from "../Tree/TreeSingleSelect";
export default function OrganizationTree({ tree_name }: { tree_name: string }) {
  const [loading, setLoading] = useState(false);
  const [trees, setTrees] = useState([]);

  const index = async () => {
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
              {loading && <Spinner_Grid />}
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
