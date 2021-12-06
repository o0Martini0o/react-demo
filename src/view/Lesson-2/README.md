# React Component (react/src/ReactBaseClasses.js)

## Class Component (react-reconciler/src/ReactFiberClassComponent.js)

```typescript jsx
class Index extends React.Component {
  constructor(...arg) {
    /* 执行 react 底层 Component 函数 */
    super(...arg)
  }
  /* state */
  state = {}
  /* 内置静态属性 */
  static number = 1
  /* 方法： 箭头函数方法直接绑定在this实例上 */
  handleClick = () => console.log(111)
  /* 生命周期 */
  componentDidMount() {
    // 打印 1 , 2 
    console.log(Index.number, Index.number1)
  }
  /* 渲染函数 */
  render() {
    return <div style={{ marginTop: '50px' }} onClick={this.handerClick}>hello,React!</div>
  }
}

/* 外置静态属性 */
Index.number1 = 2
/* 方法: 绑定在 Index 原型链的 方法*/
Index.prototype.handleClick = () => console.log(222) 
```

> 点击handleClick后结果为 111 , 因为class内部 , 箭头函数直接绑定在对象上 , 第二个handleClick是绑定在prototype原型链上的, 优先级顺序是 : 实例对象方法 > 原型链上的方法属性。

## Hook Component (react-reconciler/src/ReactFiberHooks.js)

```typescript jsx
const Index = () => {
  // 打印 1 
  console.log(Index.number)
  /* hooks  */
  const [message, setMessage] = useState('hello,world')
  /* 返回值 作为渲染ui */
  return <div onClick={() => setMessage('let us learn React!')}> {message} </div>
}
Index.number = 1 /* 绑定静态属性 */
```

> 不要尝试给函数组件 prototype 绑定属性或方法，即使绑定了也没有任何作用，因为通过上面源码中 React 对函数组件的调用，是采用直接执行函数的方式，而不是通过new的方式。

# Summary

对于类组件来说，底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每一次更新只需要调用 render
方法以及对应的生命周期就可以了。但是在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明。
