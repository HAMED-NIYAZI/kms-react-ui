import { connect } from "react-redux";
import { setSingleSelectedTreeItemAction } from "../../store/actions/tree/tree-actions";
import "./style.css";
function TreeSingleSelectItem({
  trees,
  tree_name,
  setTreeSelectedItem,
  SelectedItem,
}: {
  trees: [];
  tree_name: string;
  setTreeSelectedItem: (item: any, tree_name: string) => void;
  SelectedItem: (id: string) => void;
}) {
  function open(item: any) {
    $("#sub-tree-ul-" + tree_name + "-" + item.id).toggleClass("d-none");
    if ($("#icon-" + tree_name + "_" + item.id).hasClass("si-plus")) {
      $("#icon-" + tree_name + "_" + item.id).removeClass("si-plus");
      $("#icon-" + tree_name + "_" + item.id).addClass("si-minus ");
    } else {
      $("#icon-" + tree_name + "_" + item.id).addClass("si-plus");
      $("#icon-" + tree_name + "_" + item.id).removeClass("si-minus");
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    $(".checkbox_" + tree_name).prop("checked", false);
    $(e.currentTarget).prop("checked", true);
    setTreeSelectedItem(JSON.parse(e.target.value), tree_name);
  };

  return trees.map((item: any) => (
    <li key={item.id} style={{ listStyle: "none", marginBottom: 10 }}>
      {item.children.length > 0 && (
        <div className="custom-checkbox custom-control">
          <input
            className={"checkbox_" + tree_name}
            value={JSON.stringify(item)}
            type="checkbox"
            onChange={(e) => onChange(e)}
          />
          <i
            id={"icon-" + tree_name + "_" + item.id}
            className="si si-plus me-1"
            onClick={() => open(item)}
            style={{ cursor: "pointer" }}
          ></i>
          <label style={{ marginBottom: 0 }}>{item.persianTitle}</label>
        </div>
      )}
      {item.children.length === 0 && (
        <div className="custom-checkbox custom-control">
          <input
            type="checkbox"
            value={JSON.stringify(item)}
            className={"checkbox_" + tree_name}
            onChange={(e) => onChange(e)}
          />
          <label className="ms-1" style={{ marginBottom: 0 }}>
            {item.persianTitle}
          </label>
        </div>
      )}

      {item.children.length > 0 && (
        <ul
          className="d-none sub-tree-ul"
          id={"sub-tree-ul-" + tree_name + "-" + item.id}
        >
          <TreeSingleSelectItem
            setTreeSelectedItem={setTreeSelectedItem}
            SelectedItem={SelectedItem}
            tree_name={tree_name}
            trees={item.children}
          />
        </ul>
      )}
    </li>
  ));
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTreeSelectedItem: (item: any, treeName: string) =>
      dispatch(setSingleSelectedTreeItemAction(item, treeName)),
  };
};
export default connect(null, mapDispatchToProps)(TreeSingleSelectItem);
