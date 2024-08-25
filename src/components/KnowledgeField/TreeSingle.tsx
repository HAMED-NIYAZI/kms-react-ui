
import TreeSingleSelectItem from "./TreeSingleItem";

export default function TreeSingleSelect({
  trees,
  tree_name,
  handleSelectedItem
}: {
  trees: any;
  tree_name: string;
  handleSelectedItem:(id:string)=>void
}) {

  const handleSelectedItem2=(id:string)=>{
    handleSelectedItem(id);
  }
  return (
    <ul id={tree_name} className="tree-ul">
      <TreeSingleSelectItem tree_name={tree_name} trees={trees} SelectedItem={handleSelectedItem2}/>
    </ul>
  );
}
