import React, { useState, useEffect, useCallback } from "react";
const DefaultStyle: React.CSSProperties = {
  position: "absolute",
};
interface IProps {
  width: number;
  height: number;
  itemCount: number;
  itemSize: number | ((index: number) => number);
  renderItem: (params: {
    index: number;
    style: React.CSSProperties;
  }) => JSX.Element;
  reRenderCount?: number;
  preRenderPageCount?: number;
}
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
