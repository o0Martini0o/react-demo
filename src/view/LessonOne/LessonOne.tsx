import React, { FC, useState } from 'react'
import { Button } from '@mui/material'

const toLearn: string[] = ['react', 'vue', 'webpack', 'nodejs']

const TextComponent = (): JSX.Element => <div> hello , i am function component </div>

const renderFoot: () => JSX.Element = () => <div> i am foot</div>

export const LessonOne: FC = () => {
  const [status, setStatus] = useState(false)
  const render = () => (
      <div>
        { /* element 元素类型 */}
        <div>hello,world</div>
        { /* fragment 类型 */}
        <React.Fragment>
          <div>👽👽</div>
        </React.Fragment>
        { /* text 文本类型 */}
        my name is alien
        { /* 数组节点类型 */}
        {toLearn.map(item => <div key={item}>let us learn {item} </div>)}
        { /* 组件类型 */}
        <TextComponent/>
        { /* 三元运算 */}
        <Button variant="contained" onClick={() => setStatus(!status)}>Change Status</Button>
        {status ? <TextComponent/> : <div>三元运算</div>}
        { /* 函数执行 */}
        {renderFoot()}
        <Button variant="contained" onClick={() => console.log(render())}>打印render后的内容</Button>
      </div>
  )
  
  return (
      <>
        {render()}
      </>
  )
}
