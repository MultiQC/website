// taken from https://github.com/elviswolcott/remark-admonitions/issues/49#issuecomment-1193909728

import { h } from "hastscript";
import { visit } from "unist-util-visit";

const acceptableCalloutTypes = {
  note: { cssClass: "note", icon: "📝" },
  tip: { cssClass: "success", icon: "💡" },
  info: { cssClass: "info", icon: "ℹ️" },
  warning: { cssClass: "warning", icon: "⚠️" },
  danger: { cssClass: "danger", icon: "🚨" },
};

/**
 * Plugin to generate callout blocks.
 */
export default function calloutsPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        if (!Object.keys(acceptableCalloutTypes).includes(node.name)) {
          return;
        }

        const boxInfo = acceptableCalloutTypes[node.name];

        // Adding CSS classes according to the type.
        const data = node.data || (node.data = {});
        const tagName = node.type === "textDirective" ? "span" : "div";
        data.hName = tagName;
        data.hProperties = h(tagName, {
          class: `admonition admonition-${boxInfo.cssClass}`,
        }).properties;

        // Creating the icon.
        const icon = h("i", boxInfo.icon);
        const iconData = icon.data || (icon.data = {});
        iconData.hName = "i";
        iconData.hProperties = h("i", boxInfo.icon).properties;

        // Creating the icon's column.
        const iconWrapper = h("div");
        const iconWrapperData = iconWrapper.data || (iconWrapper.data = {});
        iconWrapperData.hName = "div";
        iconWrapperData.hProperties = h("div", { class: "column is-narrow" }).properties;
        iconWrapper.children = [icon];

        // Creating the content's column.
        const contentColWrapper = h("div");
        const contentColWrapperData = contentColWrapper.data || (contentColWrapper.data = {});
        contentColWrapperData.hName = "div";
        contentColWrapperData.hProperties = h("div", { class: "column" }).properties;
        contentColWrapper.children = [...node.children]; // Adding markdown's content block.

        // Creating the column's wrapper.
        const columnsWrapper = h("div");
        const columnsWrapperData = columnsWrapper.data || (columnsWrapper.data = {});
        columnsWrapperData.hName = "div";
        columnsWrapperData.hProperties = h("div", { class: "columns" }).properties;
        columnsWrapper.children = [iconWrapper, contentColWrapper];

        // Creating the wrapper for the callout's content.
        const contentWrapper = h("div");
        const wrapperData = contentWrapper.data || (contentWrapper.data = {});
        wrapperData.hName = "div";
        wrapperData.hProperties = h("div", { class: "admonition-body" }).properties;
        contentWrapper.children = [columnsWrapper];
        node.children = [contentWrapper];
      }
    });
  };
}
