// taken from https://github.com/elviswolcott/remark-admonitions/issues/49#issuecomment-1193909728

import { h } from "hastscript";
import { visit } from "unist-util-visit";

const acceptableCalloutTypes = {
  note: {
    title: "Note",
    id: "note",
    svg: "M13 9V3.5L18.5 9M6 2c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6Z",
  },
  info: {
    title: "Info",
    id: "info",
    svg: "M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z",
  },
  tip: {
    title: "Tip",
    id: "tip",
    svg: "M12 6a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.8c-1.79-1.04-3-2.98-3-5.2a6 6 0 0 1 6-6m2 15v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1h4m6-10h3v2h-3v-2M1 11h3v2H1v-2M13 1v3h-2V1h2M4.92 3.5l2.13 2.14l-1.42 1.41L3.5 4.93L4.92 3.5m12.03 2.13l2.12-2.13l1.43 1.43l-2.13 2.12l-1.42-1.42Z",
  },
  success: {
    title: "Success",
    id: "success",
    svg: "m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z",
  },
  warning: {
    title: "Warning",
    id: "warning",
    svg: "M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2L1 21Z",
  },
  danger: {
    title: "Danger",
    id: "danger",
    svg: "m11.5 20l4.86-9.73H13V4l-5 9.73h3.5V20M12 2c2.75 0 5.1 1 7.05 2.95C21 6.9 22 9.25 22 12s-1 5.1-2.95 7.05C17.1 21 14.75 22 12 22s-5.1-1-7.05-2.95C3 17.1 2 14.75 2 12s1-5.1 2.95-7.05C6.9 3 9.25 2 12 2Z",
  },
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
          class: `admonition admonition-${boxInfo.id} rounded-sm border mb-4 shadow-md`,
        }).properties;

        // Add svg icon
        const svg = h("svg");
        const svgData = svg.data || (svg.data = {});
        svgData.hName = "svg";
        svgData.hProperties = h("svg", {
          class: "icon fill-current w-6 mr-2",
          viewBox: "0 0 24 24",
        }).properties;
        const svgPath = h("path", { d: boxInfo.svg });
        const svgPathData = svgPath.data || (svgPath.data = {});
        svgPathData.hName = "path";
        svgPathData.hProperties = h("path", { d: boxInfo.svg }).properties;
        svg.children = [svgPath];

        // Creating title
        const title = h("span", node.attributes.title ? node.attributes.title : boxInfo.title);
        const titleData = title.data || (title.data = {});
        titleData.hName = "span";
        titleData.hProperties = h(
          "span",
          { class: `admonition-title font-semibold` },
          node.attributes.title ? node.attributes.title : boxInfo.title
        ).properties;

        // Creating the icon's column.
        const iconWrapper = h("div");
        const iconWrapperData = iconWrapper.data || (iconWrapper.data = {});
        iconWrapperData.hName = "div";
        iconWrapperData.hProperties = h("div", {
          class: "title px-3 pt-2 pb-2 flex items-center",
        }).properties;
        iconWrapper.children = [svg, title];

        // Creating the content's column.
        const contentColWrapper = h("div");
        const contentColWrapperData = contentColWrapper.data || (contentColWrapper.data = {});
        contentColWrapperData.hName = "div";
        contentColWrapperData.hProperties = h("div", { class: "p-4 pt-0" }).properties;
        contentColWrapper.children = [...node.children]; // Adding markdown's content block.

        // Creating the wrapper for the callout's content.
        const contentWrapper = h("div");
        const wrapperData = contentWrapper.data || (contentWrapper.data = {});
        wrapperData.hName = "div";
        wrapperData.hProperties = h("div", { class: "admonition-body" }).properties;
        contentWrapper.children = [iconWrapper, contentColWrapper];
        node.children = [contentWrapper];
      }
    });
  };
}
