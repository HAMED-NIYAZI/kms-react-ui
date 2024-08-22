import "./style.css";
export default function TreeSingleSelectItem({
  trees,
  tree_name,
}: {
  trees: [];
  tree_name: string;
}) {
  function open(item: any) {
    $(".checkbox_" + tree_name).prop("checked", false);
    $("#sub-tree-ul-" + tree_name + "-" + item.id).toggleClass("d-none");
    if ($("#icon-" + tree_name + "_" + item.id).hasClass("si-plus")) {
      $("#icon-" + tree_name + "_" + item.id).removeClass("si-plus");
      $("#icon-" + tree_name + "_" + item.id).addClass("si-minus ");
    } else {
      $("#icon-" + tree_name + "_" + item.id).addClass("si-plus");
      $("#icon-" + tree_name + "_" + item.id).removeClass("si-minus ");
    }
    console.log(item);
    // useLocalStorageService.setTreeSelectedItem(props.tree_name, item);
  }
  function single(item: any) {
    $(".checkbox_" + tree_name).prop("checked", false);

    console.log(item);
    // useLocalStorageService.setTreeSelectedItem(props.tree_name, item);
  }

  return trees.map((item: any) => (
    <li key={item.id} style={{ listStyle: "none", marginBottom: 10 }}>
      {item.children.length > 0 && (
        <div className="d-flex align-items-center">
          <input
            className={"checkbox_" + tree_name}
            value={item.id}
            type="checkbox"
            id={"input-checkbox-" + tree_name + "_" + item.id}
          />
          <i
            id={"icon-" + tree_name + "_" + item.id}
            className="si si-plus me-1"
          ></i>
          <label
            style={{ cursor: "pointer", marginBottom: 0 }}
            onClick={() => open(item)}
            htmlFor={"input-checkbox-" + tree_name + "_" + item.id}
            className="ms-2"
          >
            {item.persianTitle}
          </label>
        </div>
      )}
      {item.children.length === 0 && (
        <div className="d-flex align-items-center">
          <input
            id={"input-checkbox-" + tree_name + "_" + item.id}
            type="checkbox"
            value={item.id}
            className={"checkbox_" + tree_name}
          />
          <label
            onClick={() => single(item)}
            style={{ cursor: "pointer", marginBottom: 0 }}
            htmlFor={"input-checkbox-" + tree_name + "_" + item.id}
            className="ms-2"
          >
            {item.persianTitle}
          </label>
        </div>
      )}

      {item.children.length > 0 && (
        <ul
          className="d-none sub-tree-ul"
          id={"sub-tree-ul-" + tree_name + "-" + item.id}
        >
          <TreeSingleSelectItem tree_name={tree_name} trees={item.children} />
        </ul>
      )}
    </li>
  ));
}
