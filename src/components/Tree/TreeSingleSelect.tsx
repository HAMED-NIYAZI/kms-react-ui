import { useEffect } from "react";
import TreeSingleSelectItem from "./TreeSingleSelectItem";

export default function TreeSingleSelect({
  trees,
  tree_name,
}: {
  trees: any;
  tree_name: string;
}) {
  function index() {
    $.fn.extend({
      treed: function (o: any) {
        var closedClass = "si si-plus";
        var openedClass = "si si-minus";

        if (typeof o != "undefined") {
          if (typeof o.openedClass != "undefined") {
            openedClass = o.openedClass;
          }
          if (typeof o.closedClass != "undefined") {
            closedClass = o.closedClass;
          }
        }

        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree
          .find("li")
          .has("ul")
          .each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='si " + closedClass + "'></i>");
            branch.addClass("branch");
            branch.on("click", function (e) {
              if (this == e.target) {
                var icon = $(this).children("i:first");
                icon.toggleClass(openedClass + " " + closedClass);
                $(this).children().children().toggle();
              }
            });
            branch.children().children().toggle();
          });
        tree.find(".branch i").each(function () {
          $(this).on("click", function (e) {
            $(this).closest("li").click();
            e.preventDefault();
          });
        });
        //fire event from the dynamically added icon
        tree.find(".branch .indicator").each(function () {
          $(this).on("click", function () {
            $(this).closest("li").click();
          });
        });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find(".branch>a").each(function () {
          $(this).on("click", function (e) {
            $(this).closest("li").click();
            e.preventDefault();
          });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find(".branch>button").each(function () {
          $(this).on("click", function (e) {
            $(this).closest("li").click();
            e.preventDefault();
          });
        });
      },
    });

    $(`#OrganizationViewList`).treed();
  }
  useEffect(() => {
    index();
  }, []);
  return (
    <ul id={tree_name}>
      <TreeSingleSelectItem tree_name={tree_name} trees={trees} />
    </ul>
  );
}
