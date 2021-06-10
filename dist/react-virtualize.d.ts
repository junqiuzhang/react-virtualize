import React, { CSSProperties } from "react";
interface IProps {
    width: number;
    height: number;
    itemCount: number;
    itemSize: number | ((index: number) => number);
    renderItem: (params: {
        index: number;
        style: CSSProperties;
    }) => JSX.Element;
    reRenderCount?: number;
    preRenderPageCount?: number;
}
declare const ReactVirtualized: React.FC<IProps>;
export default ReactVirtualized;
