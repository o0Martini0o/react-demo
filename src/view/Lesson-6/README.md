# ref

## 基础用法

> 3种方式

1. ref是一个字符串

```jsx
    class stringRef extends Component {
  // stringRef是一个过时的操作
  render() {
    return (
        <>
          <div ref={'stringRef'}></div>
          <button onClick={() => this.refs.stringRef}></button>
        </>
    )
  }
}
```

2. ref是一个函数

```jsx
    // render过后执行ref内的函数,当做一个callback.
class stringRef extends Component {
  val
  
  render() {
    return (
        <>
          <div ref={(node) => this.val = node}></div>
          <button onClick={() => this.val}></button>
        </>
    )
  }
}
```

3. ref是一个ref对象

```jsx
import { useRef } from 'react'
// hooks
const App = () => {
  const divRef = useRef(null)
  return (
      <div ref={divRef}></div>
  )
}

class stringRef extends Component {
  constructor(props) {
    super(props)
    this.refObj = createRef()
  }
  
  render() {
    return (
        <>
          <div ref={refObj}></div>
          <button onClick={() => this.refObj.current}></button>
        </>
    )
  }
}
```

## 高阶用法

1. 场景一 : 跨层级获取
2. 场景二 : 合并转发ref
3. 场景三 : 高阶组件转发

## 传递组件实例(组件间通讯)

1. 类组件 流程分析：

    - 子组件暴露方法 fatherSay 供父组件使用，父组件通过调用方法可以设置子组件展示内容。
    - 父组件提供给子组件 toFather，子组件调用，改变父组件展示内容，实现父 <-> 子 双向通信。

```jsx
    /* 子组件 */
class Son extends React.PureComponent {
  state = {
    fatherMes: '',
    sonMes: ''
  }
  // 提供给父组件的API
  fatherSay = (fatherMes) => this.setState({ fatherMes })
  
  render() {
    const { fatherMes, sonMes } = this.state
    return <div className="sonbox">
      <div className="title">子组件</div>
      <p>父组件对我说：{fatherMes}</p>
      <div className="label">对父组件说</div>
      <input onChange={(e) => this.setState({ sonMes: e.target.value })} className="input"/>
      <button className="searchbtn" onClick={() => this.props.toFather(sonMes)}>to father</button>
    </div>
  }
}

/* 父组件 */
export default function Father() {
  const [sonMes, setSonMes] = React.useState('')
  // 用来获取子组件实例 
  const sonInstance = React.useRef(null)
  const [fatherMes, setFatherMes] = React.useState('')
  // 调用子组件实例方法，改变子组件state
  const toSon = () => sonInstance.current.fatherSay(fatherMes)
  return <div className="box">
    <div className="title">父组件</div>
    <p>子组件对我说：{sonMes}</p>
    <div className="label">对子组件说</div>
    <input onChange={(e) => setFatherMes(e.target.value)} className="input"/>
    <button className="searchbtn" onClick={toSon}>to son</button>
    <Son ref={sonInstance} toFather={setSonMes}/>
  </div>
}
```

2. 函数式组件

   流程分析：

    - 父组件用 ref 标记子组件，由于子组件 Son 是函数组件没有实例，所以用 forwardRef 转发 ref。
    - 子组件 Son 用 useImperativeHandle 接收父组件 ref，将让 input 聚焦的方法 onFocus 和 改变 input 输入框的值的方法 onChangeValue 传递给 ref 。
    - 父组件可以通过调用 ref 下的 onFocus 和 onChangeValue 控制子组件中 input 赋值和聚焦。

```jsx
// 子组件
function Son(props, ref) {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  useImperativeHandle(ref, () => {
    const handleRefs = {
      // 声明方法用于聚焦input框
      onFocus() {
        inputRef.current.focus()
      },
      // 声明方法用于改变input的值
      onChangeValue(value) {
        setInputValue(value)
      }
    }
    return handleRefs
  }, [])
  return <div>
    <input placeholder="请输入内容" ref={inputRef} value={inputValue}/>
  </div>
}

const ForwarSon = forwardRef(Son)

// 父组件
class Index extends React.Component {
  cur = null
  
  handerClick() {
    const { onFocus, onChangeValue } = this.cur
    // 让子组件的输入框获取焦点
    onFocus()
    // 让子组件input  
    onChangeValue('let us learn React!')
  }
  
  render() {
    return <div style={{ marginTop: '50px' }}>
      <ForwarSon ref={cur => (this.cur = cur)}/>
      <button onClick={this.handerClick.bind(this)}>操控子组件</button>
    </div>
  }
}
```
