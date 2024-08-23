
import TreeSingleSelectItem from "./TreeSingleSelectItem";

export default function TreeSingleSelect({
  trees,
  tree_name,
}: {
  trees: any;
  tree_name: string;
}) {
  return (
    <ul id={tree_name} className="tree-ul">
      <TreeSingleSelectItem tree_name={tree_name} trees={trees} />
    </ul>
  );
}
