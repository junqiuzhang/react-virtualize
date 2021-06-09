# react-virtualized
[中文文档](https://github.com/junqiuzhang/react-virtualize/blob/master/README_zh-CN.md)

react-virtualized is a virtual rendering library like react-window.

## Install

```
# Yarn
yarn add react-virtualize

# NPM
npm install --save react-virtualize
```

## Usage

Usage is similar to react-window, but it is lighter.

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
  preRenderPageNumber={1} // number of pre-rendered pages, the larger the number, the more list items will be pre-rendered
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
  preRenderPageNumber?: number;
}
```

## License

ISC
