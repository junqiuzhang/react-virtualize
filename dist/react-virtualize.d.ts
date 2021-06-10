import React from "react";
interface IProps {
    /**
     * width of list
     */
    width: number;
    /**
     * height of list
     */
    height: number;
    /**
     * used to traverse the list, usually the length of the list
     */
    itemCount: number;
    /**
     * used to control the height of a list item, numbers or functions can be passed
     */
    itemSize: number | ((index: number) => number);
    /**
     * used to render list item, the style should be passed to item
     */
    renderItem: (params: {
        index: number;
        style: React.CSSProperties;
    }) => JSX.Element;
    /**
     * re-render count, if your change list item‘s height, you must change this value
     */
    reRenderCount?: number;
    /**
     * pre-rendered pages count, the larger the number, the more list items will be pre-rendered
     */
    preRenderPageCount?: number;
}
/**
 * react-virtualize is a virtual rendering library like react-window.
 *
 * Note: not react-virtualized
 * @param {} props
 * @returns
 */
declare const ReactVirtualized: React.FC<IProps>;
export default ReactVirtualized;
