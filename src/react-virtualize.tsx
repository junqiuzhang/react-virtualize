import React, { useState, useEffect, useCallback, ReactNode } from "react";
const DefaultStyle: React.CSSProperties = {
  position: "absolute",
};
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
  }) => ReactNode;
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
const ReactVirtualized: React.FC<IProps> = (props) => {
  const [listTop, setListTop] = useState<number>(0);
  const [itemsTop, setItemsTop] = useState<number[]>([]);
  const renderItems = useCallback(
    (scrollTop: number) => {
      const itemCount = props.itemCount ?? 0;
      const items = [];
      if (!props.renderItem) {
        return [];
      }
      const pageBottom =
        scrollTop + (1 + (props.preRenderPageCount ?? 1)) * props.height;
      const pageTop =
        scrollTop - (props.preRenderPageCount ?? 1) * props.height;
      for (let i = 0; i < itemCount; i++) {
        const curTop = itemsTop[i];
        const curBottom = itemsTop[i + 1];
        if (curTop < pageBottom && curBottom > pageTop) {
          items.push(
            props.renderItem({
              index: i,
              style: { ...DefaultStyle, top: `${curTop}px` },
            })
          );
        } else if (items.length > 0) {
          break;
        }
      }
      return items;
    },
    [
      itemsTop,
      props.height,
      props.itemCount,
      props.renderItem,
      props.preRenderPageCount,
    ]
  );
  const calculateItemsTop = useCallback(() => {
    const itemCount = props.itemCount ?? 0;
    const items = [0];
    let top = 0;
    for (let i = 0; i < itemCount; i++) {
      if (typeof props.itemSize === "function") {
        top += props.itemSize(i);
      } else if (typeof props.itemSize === "number") {
        top += props.itemSize;
      }
      items.push(top);
    }
    setItemsTop(items);
  }, [props.itemCount, props.itemSize]);
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    /// @ts-ignore
    const curListTop = e.target?.scrollTop ?? 0;
    setListTop((prevListTop) => {
      const diff = curListTop - prevListTop;
      const maxDiff = props.height / 2;
      if (diff < maxDiff && diff > -maxDiff) return prevListTop;
      return curListTop;
    });
  }, []);
  useEffect(() => {
    calculateItemsTop();
  }, [props.reRenderCount, calculateItemsTop]);
  return (
    <div
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        overflow: "auto",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          position: "relative",
          height: `${itemsTop[itemsTop.length - 1]}px`,
        }}
      >
        {renderItems(listTop)}
      </div>
    </div>
  );
};
export default ReactVirtualized;
