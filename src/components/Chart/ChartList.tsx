import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import { toast } from "react-toastify";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import ChartService from "../../services/ChartService";
import SingleSelectTreeComponent from "../KnowledgeField/SingleSelectTreeComponent";
import OrganizationService from "../../services/OrganizationService";

function ChartList({ setTreeItem }) {
  const [treeOrganizationData, setTreeOrganizationData] = useState([]);
  const [treeChartData, setTreeChartData] = useState([]);
  const [lastApiCallTime, setLastApiCallTime] = useState(0);

  async function handleDelete(id: string, name: string) {
    // ... (unchanged)
  }

  const getApi = useCallback(async (id: string) => {
    const currentTime = Date.now();
    if (currentTime - lastApiCallTime > 500) { // Allow API calls at least 500ms apart
      setLastApiCallTime(currentTime);
      const response = await ChartService.getOrganizationChartTree(id);

      if (response.data.result === 0) {
        setTreeChartData(response.data.data);
      } else if (response.data.result === 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    }
  }, [lastApiCallTime]);

  const debounceGetApi = useCallback((func: Function, wait: number) => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(func, args), wait);
    };
  }, []);

  const debouncedHandleOrganizationId = useCallback(debounceGetApi(getApi, 300), [debounceGetApi, getApi]);

  const handleOrganizationId = useCallback((id: string, name: string) => {
    if (id) {
      debouncedHandleOrganizationId(id);
    }
  }, [debouncedHandleOrganizationId]);

  const handleChartId = useCallback((id: string, name: string) => {
    console.log(id);
    console.log(name);
  }, []);

  const index = useCallback(async () => {
    try {
      const response = await OrganizationService.getOrganizationTree();
      if (response.data.result === 0) {
        setTreeOrganizationData(response.data.data);
      } else if (response.data.result === 5) {
        toast.warning(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    index();
  }, [index]);

  return (
    <>
      <BreadCrumb
        BreadList={[
          { Title: "اطلاعات پایه", Address: "" },
          { Title: "چارت ها", Address: "/charts" },
        ]}
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="row pad">
            <div className="col-md-6">
              <SingleSelectTreeComponent
                tree_name="organizaton-one"
                tree_caption="سازمان ها"
                tree_data={treeOrganizationData}
                onReload={() => {
                  console.log("test");
                }}
                onDelete={handleDelete}
                onGetSingleSelectValue={handleOrganizationId}
              />
            </div>
            <div className="col-md-6">
              <SingleSelectTreeComponent
                tree_name="chart-one"
                tree_caption="چارت ها"
                tree_data={treeChartData}
                onReload={() => {
                  console.log("test");
                }}
                onGetSingleSelectValue={handleChartId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch: (p: any) => void) => {
  return {
    setTreeItem: (treeName: string, payload: object | null) =>
      dispatch(setSingleSelectedTreeItemAction(payload, treeName)),
  };
};
const mapStateToProps = (state: any) => {
  return {
    treeItem: state.singleSelectedTreeItemState.single_selected_tree_item,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartList);
