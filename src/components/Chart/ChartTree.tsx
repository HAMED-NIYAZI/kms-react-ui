import { useEffect, useState } from "react";
import SpinnerGrid from "../Spinner/SpinnerGrid";
import TreeSingleSelect from "../Tree/TreeSingleSelect";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ChartService from "../../services/ChartService";

function ChartTree({
  tree_name,
  treeItem,
}: {
  tree_name: string;
  treeItem: any;
}) {
  const [loading, setLoading] = useState(false);

  const [trees, setTrees] = useState([]);

  const index = async () => {
    setLoading(true);

    try {
      const response = await ChartService.getOrganizationChartTree(
        "dee564e8-0c8d-4b25-a1c0-708edd3c9f95"
      );
      if (response.data.result == 0) {
        setTrees(response.data.data);
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
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header pb-0">
            <div className="d-flex justify-content-between">
              <h4
                className="card-title mg-b-0"
                style={{ paddingTop: "10px!important" }}
              >
                چارت ها
              </h4>
              <p className=" badge badge-warning p-2 text-black">
                {treeItem[tree_name]?.persianTitle}
              </p>
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
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    treeItem: state.singleSelectedTreeItemState.single_selected_tree_item,
  };
};
export default connect(mapStateToProps)(ChartTree);
