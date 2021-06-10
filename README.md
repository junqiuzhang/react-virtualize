# react-virtualize
[中文文档](https://github.com/junqiuzhang/react-virtualize/blob/master/README_zh-CN.md)

react-virtualize is a virtual rendering library like react-window.

## Install

```
# Yarn
yarn add react-virtualize

# NPM
npm install --save react-virtualize
```

## Usage

Usage is similar to react-window, there are some differentia:

1. react-virtualize only support virtualize list, not support virtualize table.
2. react-virtualize use renderItem function to render list items.
3. react-virtualize use reRenderCount to determine if list updates are needed.
4. react-virtualize use preRenderPageCount to control the number of pre-rendered pages.

### example

```tsx
import List from "react-virtualize";
<List
  height={400}
  width={600}
  itemCount={props.dataSource.length} // Used to traverse a list, usually the length of the data source, numbers or functions can be passed
  itemSize={(index) => {
    // used to get the height of a list item, numbers or functions can be passed
    return 100;
  }}
  reRenderCount={1} // if your change list item‘s height, you must change this value
  preRenderPageCount={1} // number of pre-rendered pages, the larger the number, the more list items will be pre-rendered
  renderItem={({ index, style }) => {
    // used to render list items
    const data = props.dataSource[index];
    return <div style={style}>{data}</div>;
  }}
/>;
```

### interface

```ts
interface IProps {
  width: number;
  height: number;
  itemCount: number | (() => number);
  itemSize: number | ((index: number) => number);
  renderItem: (params: { index: number; style: CSSProperties }) => JSX.Element;
  reRenderCount?: number;
  preRenderPageCount?: number;
}
```

## License

ISC
