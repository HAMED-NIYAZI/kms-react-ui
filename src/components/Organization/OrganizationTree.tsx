import { useEffect, useState } from "react";
import OrganizationService from "../../services/OrganizationService";
import SpinnerGrid from "../Spinner/Spinner_Grid";
import TreeSingleSelect from "../Tree/TreeSingleSelect";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";

function OrganizationTree({
  tree_name,
  treeSingleSelectValue,
}: Readonly<{
  tree_name: string;
  treeSingleSelectValue: any;
}>) {
  const [loading, setLoading] = useState(false);

  const [trees, setTrees] = useState([]);

  const index = async () => {
    setLoading(true);

    try {
      const response = await OrganizationService.getOrganizationTree();
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
                سازمان ها
              </h4>
              <p className=" badge badge-warning p-2 text-black">
                {treeSingleSelectValue[tree_name]?.persianTitle}
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

const mapDispatchToProps = (dispatch: (p: any) => void) => {
  return {
    setTreeItem: (treeName: string, payload: any) =>
      dispatch(setSingleSelectedTreeItemAction(payload, treeName)),
  };
};
const mapStateToProps = (state: any) => {
  return {
    treeSingleSelectValue:
      state.singleSelectedTreeItemState.single_selected_tree_item,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTree);
