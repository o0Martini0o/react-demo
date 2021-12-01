import React, { FC, useState } from 'react'
import { Button, List, ListItem } from '@mui/material'
import styles from './LessonOne.module.scss'

const toLearn: string[] = ['react', 'vue', 'webpack', 'nodejs']

const TextComponent = (): JSX.Element => <div> hello , i am function component </div>

const renderFoot: () => JSX.Element = () => <div> i am foot</div>

export const LessonOne: FC = () => {
  const [status, setStatus] = useState(false)
  const render = () => {
    const reactElement = (
        <List className={styles.root}>
          <ListItem className={styles.item}>
            <div className={styles.itemTitle}>
              element 元素类型 :
            </div>
            hello,world
          </ListItem>
          
          <ListItem className={styles.item}>
            <div className={styles.itemTitle}>
              fragment 类型 :
            </div>
            <React.Fragment>
              <div>👽👽</div>
            </React.Fragment>
          </ListItem>
          
          <ListItem className={styles.item}>
            <div className={styles.itemTitle}>
              text 文本类型 :
            </div>
            my name is lee
          </ListItem>
          
          <ListItem className={styles.item} style={{ alignItems: 'flex-start' }}>
            <div className={styles.itemTitle}>
              数组节点类型 :
            </div>
            <div>
              {toLearn.map(item => <div key={item}>let us learn {item} </div>)}
            </div>
          </ListItem>
          
          <ListItem className={styles.item}>
            <div className={styles.itemTitle}>
              组件类型 :
            </div>
            <TextComponent/>
          </ListItem>
          
          <ListItem className={styles.item}>
            <div className={styles.itemTitle}>
              三元运算 :
            </div>
            <Button variant="contained" onClick={() => setStatus(!status)} style={{ marginRight: '.25em' }}>
              Change Status
            </Button>
            {status ? <TextComponent/> : <div>三元运算</div>}
          </ListItem>
          
          <ListItem className={styles.item}>
            <div className={styles.itemTitle}>
              函数执行 :
            </div>
            {renderFoot()}
          </ListItem>
          
          <ListItem className={styles.item}>
            <Button variant="contained" onClick={() => console.log(render())}>打印render后的内容</Button>
          </ListItem>
        </List>
    )
    console.log(reactElement)
    const { children } = reactElement.props
    /* 第1步 ： 扁平化 children  */
    const flatChildren = React.Children.toArray(children)
    console.log(flatChildren)
    /* 第2步 ： 除去文本节点 */
    // 无法删除的原因是因为我用List包裹了起来,原有的结构被包裹了,所以在下一级判断.
    const newChildren: any = []
    React.Children.forEach(flatChildren, (item) => {
      if (React.isValidElement(item)) newChildren.push(item)
    })
    /* 第3步，插入新的节点 */
    const lastChildren = React.createElement(`div`, { className: 'last' }, `say goodbye`)
    newChildren.push(lastChildren)
    
    /* 第4步：修改容器节点 */
    return React.cloneElement(reactElement, {}, ...newChildren)
  }
  return (
      <>
        {render()}
      </>
  )
}
