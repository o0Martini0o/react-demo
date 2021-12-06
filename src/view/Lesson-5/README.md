# 类组件生命周期

> 执行顺序 : 定义组件 -> constructor(执行constructClassInstance函数) -> getDerivedStateFromProps / componentWillMount(执行mountClassInstance函数) -> render -> componentDidMount

1. 定义组件,源码: react/src/ReactBaseClasses.js

```js
function Component(props, context, updater) {
  //绑定props
  this.props = props;
  //绑定context
  this.context = context;
  //绑定ref
  this.refs = emptyObject;
  //上面所属的updater 对象
  this.updater = updater || ReactNoopUpdateQueue;
}

// 绑定setState 方法
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
}
// 绑定forceupdate 方法
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
}
```

1.1 对于类组件的执行，是在react-reconciler/src/ReactFiberClassComponent.js中：

```js
function constructClassInstance(
    // 当前正在工作的 fiber 对象
    workInProgress,
    // 我们的类组件
    ctor,
    // props 
    props
) {
  // 实例化组件，得到组件实例 instance
  const instance = new ctor(props, context)
}
```

1.2 对于函数组件的执行，是在react-reconciler/src/ReactFiberHooks.js中

```js
function renderWithHooks(
    // 当前函数组件对应的 `fiber`， 初始化
    current,
    // 当前正在工作的 fiber 对象
    workInProgress,
    // 我们函数组件
    Component,
    // 函数组件第一个参数 props
    props,
    // 函数组件其他参数
    secondArg,
    //下次渲染过期时间
    nextRenderExpirationTimel
) {
  // 执行我们的函数组件，得到 return 返回的 React.element对象
  let children = Component(props, secondArg);
}
```

## 初始化阶段

> 执行顺序：constructor -> getDerivedStateFromProps / componentWillMount -> render -> componentDidMount

2.getDerivedStateFromProps / componentWillMount阶段,源码: react-reconciler/src/ReactFiberClassComponent.js

```js
function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
  const instance = workInProgress.stateNode;
  const getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  // ctor 就是我们写的类组件，获取类组件的静态防范
  if (typeof getDerivedStateFromProps === 'function') {
    // 这个时候执行 getDerivedStateFromProps 生命周期 ，得到将合并的state
    const partialState = getDerivedStateFromProps(nextProps, prevState);
    // 合并state
    const memoizedState = partialState === null || partialState === undefined ? prevState : Object.assign({}, prevState, partialState);
    workInProgress.memoizedState = memoizedState;
    // 将state 赋值给我们实例上，instance.state  就是我们在组件中 this.state获取的state
    instance.state = workInProgress.memoizedState;
  }
  if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && typeof instance.componentWillMount === 'function') {
    // 当 getDerivedStateFromProps 和 getSnapshotBeforeUpdate 不存在的时候 ，执行 componentWillMount
    instance.componentWillMount();
  }
}
```

3. 组件实例化阶段调用componentDidMount,源码: react-reconciler/src/ReactFiberCommitWork.js

```js
function commitLifeCycles(finishedRoot, current, finishedWork) {
  // fiber tag 在第一节讲了不同fiber类型
  switch (finishedWork.tag) {
      // 如果是 类组件 类型 
    case ClassComponent: {
      // 类实例 
      const instance = finishedWork.stateNode
      if (current === null) {
        // 类组件第一次调和渲染
        instance.componentDidMount()
      } else {
        // 类组件更新
        instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate)
      }
    }
  }
}
```

## 更新阶段

> 执行顺序 : componentWillReceiveProps( props 改变) / getDerivedStateFromProp -> shouldComponentUpdate -> componentWillUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate

> 类组件更新逻辑,源码 react-reconciler/src/ReactFiberBeginWork.js

```js
// workloop React 处理类组件的主要功能方法
function updateClassComponent() {
  let shouldUpdate
  // stateNode 是 fiber 指向 类组件实例的指针。
  const instance = workInProgress.stateNode
  // instance 为组件实例,如果组件实例不存在，证明该类组件没有被挂载过，那么会走初始化流程
  if (instance === null) {
    // 组件实例将在这个方法中被new。
    constructClassInstance(workInProgress, Component, nextProps);
    //初始化挂载组件流程
    mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    // shouldUpdate 标识用来证明 组件是否需要更新。
    shouldUpdate = true;
  } else {
    // 更新组件流程
    shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps, renderExpirationTime)
  }
  if (shouldUpdate) {
    // 执行render函数 ，得到子节点 
    nextChildren = instance.render();
    // 继续调和子节点 
    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)
  }
}
```

> 类组件更新流程逻辑,源码: react-reconciler/src/ReactFiberClassComponent.js

```js
function updateClassInstance(current, workInProgress, ctor, newProps, renderExpirationTime) {
  // 类组件实例
  const instance = workInProgress.stateNode;
  // 判断是否具有 getDerivedStateFromProps 生命周期
  const hasNewLifecycles = typeof ctor.getDerivedStateFromProps === 'function'
  if (!hasNewLifecycles && typeof instance.componentWillReceiveProps === 'function') {
    // 浅比较 props 不相等
    if (oldProps !== newProps || oldContext !== nextContext) {
      // 执行生命周期 componentWillReceiveProps 
      instance.componentWillReceiveProps(newProps, nextContext);
    }
  }
  let newState = (instance.state = oldState);
  if (typeof getDerivedStateFromProps === 'function') {
    // 执行生命周期getDerivedStateFromProps  ，逻辑和mounted类似 ，合并state  
    ctor.getDerivedStateFromProps(nextProps, prevState)
    newState = workInProgress.memoizedState;
  }
  let shouldUpdate = true
  if (typeof instance.shouldComponentUpdate === 'function') {
    // 执行生命周期 shouldComponentUpdate 返回值决定是否执行render ，调和子节点
    shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
  }
  if (shouldUpdate) {
    if (typeof instance.componentWillUpdate === 'function') {
      // 执行生命周期 componentWillUpdate 
      instance.componentWillUpdate();
    }
  }
  return shouldUpdate
}
```

> 执行getSnapshotBeforeUpdate阶段,源码: react-reconciler/src/ReactFiberCommitWork.js

```js
function commitBeforeMutationLifeCycles(current, finishedWork) {
  switch (finishedWork.tag) {
    case ClassComponent: {
      // 执行生命周期 getSnapshotBeforeUpdate   
      const snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState)
      // 返回值将作为 __reactInternalSnapshotBeforeUpdate 传递给 componentDidUpdate 生命周期
      instance.__reactInternalSnapshotBeforeUpdate = snapshot;
    }
  }
}
```

## 销毁阶段

> 　对应一个处理逻辑,源码: react-reconciler/src/ReactFiberCommitWork.js

```js
function callComponentWillUnmountWithTimer() {
  instance.componentWillUnmount();
}
```

# 各个生命周期

## constructor

> React 在不同时期抛出不同的生命周期钩子，也就意味这这些生命周期钩子的使命。上面讲过 constructor 在类组件创建实例时调用，而且初始化的时候执行一次，所以可以在 constructor 做一些初始化的工作。

```jsx
class App extends Component {
  constructor(props) {
    // 执行 super ，别忘了传递props,才能在接下来的上下文中，获取到props。
    super(props)
    // ① 可以用来初始化state，比如可以用来获取路由中的
    this.state = {
      name: 'alien'
    }
    // ② 绑定 this 
    this.handleClick = this.handleClick.bind(this)
    // ③ 绑定防抖函数，防抖 500 毫秒 
    this.handleInputChange = debounce(this.handleInputChange, 500)
    
    const _render = this.render
    this.render = function () {
      // ④ 劫持修改类组件上的一些生命周期
      return _render.bind(this)
    }
  }
  
  // 点击事件 
  handleClick() {}
  
  // 表单输入 
  handleInputChange() {}
}
```

constructor 作用：

- 初始化 state ，比如可以用来截取路由中的参数，赋值给 state 。
- 对类组件的事件做一些处理，比如绑定 this、节流、防抖等。
- 对类组件进行一些必要生命周期的劫持，渲染劫持，这个功能更适合反向继承的HOC ，在 HOC 环节，会详细讲解反向继承这种模式。

## getDerivedStateFromProps

两个参数：

- nextProps 父组件新传递的 props ;
- prevState 组件在此次更新前的 state 。

```jsx
class App extends Component {
  static getDerivedStateFromProps(newProps) {
    const { type } = newProps
    switch (type) {
      case 'fruit' :
        // ① 接受 props 变化 ， 返回值将作为新的 state ，用于 渲染 或 传递给shouldComponentUpdate
        return { list: ['苹果', '香蕉', '葡萄'] }
      case 'vegetables':
        return { list: ['菠菜', '西红柿', '土豆'] }
    }
  }
  
  render() {
    return <div>{this.state.list.map((item) => <li key={item}>{item}</li>)}</div>
  }
}
```

getDerivedStateFromProps 作用：

- 代替 componentWillMount 和 componentWillReceiveProps
- 组件初始化或者更新时，将 props 映射到 state。
- 返回值与 state 合并完，可以作为 shouldComponentUpdate 第二个参数 newState ，可以判断是否渲染组件。(请不要把 getDerivedStateFromProps 和
  shouldComponentUpdate 强行关联到一起，两者没有必然联系)
