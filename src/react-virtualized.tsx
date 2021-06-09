import React, { CSSProperties, useEffect, useRef, useState } from "react";
const DefaultStyle: CSSProperties = {
  position: "absolute",
};
interface IProps {
  width: number;
  height: number;
  itemCount: number;
  itemSize: number | ((index: number) => number);
  reRenderItem: number;
  renderItem: (params: { index: number; style: CSSProperties }) => JSX.Element;
}
const ReactVirtualized: React.FC<IProps> = (props) => {
  const [reRender, setReRender] = useState<number>(0);
  const listEleRef = useRef<HTMLDivElement | null>(null);
  const itemsTopRef = useRef<number[]>([]);
  const listTop = useRef<number>(0);
  const throttleDiff = props.height;
  const renderItems = () => {
    const itemCount = props.itemCount || 0;
    const items = [];
    if (!listEleRef.current) {
      return [];
    }
    if (!props.renderItem) {
      return [];
    }
    for (let i = 0; i < itemCount; i++) {
      const currentTop = itemsTopRef.current[i];
      const currentHeight = itemsTopRef.current[i + 1] - itemsTopRef.current[i];
      if (
        currentTop < listEleRef.current.scrollTop + 2 * props.height &&
        currentTop + currentHeight > listEleRef.current.scrollTop - props.height
      ) {
        items.push(
          props.renderItem({
            index: i,
            style: { ...DefaultStyle, top: `${currentTop}px` },
          })
        );
      }
    }
    return items;
  };
  const calculateItemsTop = () => {
    const itemCount = props.itemCount || 0;
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
    itemsTopRef.current = items;
    setReRender((i) => i + 1);
  };
  const handleScroll = () => {
    const curListTop = listEleRef.current?.scrollTop ?? 0;
    const prevListTop = listTop.current;
    const diff = curListTop - prevListTop;
    if (diff < throttleDiff && diff > -throttleDiff) return;
    listTop.current = curListTop;
    calculateItemsTop();
  };
  useEffect(() => {
    setReRender((i) => i + 1);
  }, [listEleRef.current]);
  useEffect(() => {
    calculateItemsTop();
  }, [props.reRenderItem]);
  return (
    <div
      ref={listEleRef}
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
          height: `${itemsTopRef.current[itemsTopRef.current.length - 1]}px`,
        }}
      >
        {renderItems()}
      </div>
    </div>
  );
};
export default ReactVirtualized;
