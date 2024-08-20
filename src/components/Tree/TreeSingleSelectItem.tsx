import "./style.css";
export default function TreeSingleSelectItem({
  trees,
  tree_name,
}: {
  trees: [];
  tree_name: string;
}) {
  function checkboxClick(item: any) {
    $("." + tree_name).prop("checked", false);
    $("#" + item.id + tree_name).prop("checked", true);
    // useLocalStorageService.setTreeSelectedItem(props.tree_name, item);
  }

  return trees.map((item: any, i: number) => {
    return (
      <li
        className={`tree-item ${item.children.length ? "branch" : ""}`}
        key={i}
      >
        <div
          className="d-flex align-items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          <div className="checkbox d-flex">
            <div
              className={`custom-checkbox custom-control ${
                item.children.length == 0 ? "leaf" : ""
              }`}
            >
              <input
                type="checkbox"
                onChange={() => checkboxClick(item)}
                className={`custom-control-input ${tree_name}`}
                id={item.id.toString() + tree_name}
              />
              <label
                htmlFor={item.id.toString() + tree_name}
                className="custom-control-label mt-1"
              >
                <span className="pr-4"></span>
              </label>
            </div>
          </div>
          {item.persianTitle}
        </div>
        {item.children.length && (
          <ul>
            <TreeSingleSelectItem tree_name={tree_name} trees={item.children} />
          </ul>
        )}
      </li>
    );
  });
}
