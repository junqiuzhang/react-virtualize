# react-virtualize

react-virtualize 是一个虚拟化渲染的库，类似于 react-window

## 特性

1. react-virtualize 更轻量，共 100 行代码，体积仅有 2 KB
2. react-virtualize 性能更好，滚动时 javascript 执行时间仅为 react-window 的 20%
3. react-virtualize 使用 hooks 编写，全面支持函数式编程

## 安装

注意：是 react-virtualize 不是 react-virtualized

```
# Yarn
yarn add react-virtualize

# NPM
npm install --save react-virtualize
```

## 使用

用法类似于 react-window，下面是几个不同点：

1. react-virtualize 只支持虚拟化一维列表，不支持虚拟化二维列表
2. react-virtualize 使用 renderItem 函数渲染列表
3. react-virtualize 使用 reRenderCount 来判断是否需要重新计算高度并渲染列表
4. react-virtualize 使用 preRenderPageCount 来控制预渲染的页数

### 例子

```tsx
import List from "react-virtualize";
<List
  height={400}
  width={600}
  itemCount={props.dataSource.length} // 用于遍历列表，通常是列表长度
  itemSize={(index) => {
    // 用于控制列表项高度，可传数字或函数
    return 100;
  }}
  reRenderCount={1} // 重新渲染的标记，内部会监听这个标记，如果标记改变，那么会重新渲染列表，所以如果列表项高度改变，那么必须改变这个值
  preRenderPageCount={1} // 预渲染的页数，数字越大，预渲染的列表项就越多
  renderItem={({ index, style }) => {
    // 用于渲染列表项
    const data = props.dataSource[index];
    return <div style={style}>{data}</div>;
  }}
/>;
```

### 接口

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

## 开源协议

ISC
