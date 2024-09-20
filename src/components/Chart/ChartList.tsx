import  { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import { toast } from "react-toastify";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import ChartService from "../../services/ChartService";
import SingleSelectTreeComponent from "../KnowledgeField/SingleSelectTreeComponent";
import OrganizationService from "../../services/OrganizationService";
import { useNavigate } from 'react-router-dom';



function ChartList() {
  const [treeOrganizationData, setTreeOrganizationData] = useState([]);
  const [treeChartData, setTreeChartData] = useState([]);
  const [lastApiCallTime, setLastApiCallTime] = useState(0);
  const [chartsKey, setchartsKey] = useState(0);

  const navigate = useNavigate();


  const getApi = useCallback(async (id: string) => {
    const currentTime = Date.now();
    if (currentTime - lastApiCallTime > 2000) { // Allow API calls at least 500ms apart
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

  const debouncedHandleOrganizationId = useCallback(debounceGetApi(getApi, 1300), [debounceGetApi, getApi]);

  const handleOrganizationId = useCallback((id: string) => {
    if (id) {
      debouncedHandleOrganizationId(id);
    }
  }, [debouncedHandleOrganizationId]);

  const handleonGetSingleSelectValueChart = useCallback((id: string, name: string) => {
  }, []);

  const index = useCallback(async () => {
    try {
      setTreeOrganizationData([]);
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
                tree_name="organizatons"
                tree_caption="سازمان ها"
                tree_data={treeOrganizationData}
                onReload={async() => {
                  await index();
                }}

                onGetSingleSelectValue={handleOrganizationId}
              />
            </div>
            <div className="col-md-6">
              <SingleSelectTreeComponent
                tree_name="charts"
                tree_caption="چارت ها"
                tree_data={treeChartData}
                key={chartsKey}
                onReload={() => {setchartsKey(chartsKey+1)}}
                onGetSingleSelectValue={handleonGetSingleSelectValueChart}
                onAdd={()=>{navigate("/charts/create");}}
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
