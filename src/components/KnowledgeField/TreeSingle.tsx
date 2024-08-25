
import TreeSingleItem from "./TreeSingleItem";

export default function TreeSingle({
  trees,
  tree_name
 }: {
  trees: any;
  tree_name: string;
 }) {

 
  return (
    <ul id={tree_name} className="tree-ul">
      <TreeSingleItem tree_name={tree_name} trees={trees}  />
    </ul>
  );
}
