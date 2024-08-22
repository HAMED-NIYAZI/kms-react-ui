import { useEffect } from "react";
import TreeSingleSelectItem from "./TreeSingleSelectItem";

export default function TreeSingleSelect({
  trees,
  tree_name,
}: {
  trees: any;
  tree_name: string;
}) {

  useEffect(() => {
   
  }, []);
  return (
    <ul id={tree_name} className="tree-ul">
      <TreeSingleSelectItem tree_name={tree_name} trees={trees} />
    </ul>
  );
}
