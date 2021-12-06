import { FC, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import styles from './FunctionLifecycle.module.scss'

interface FunctionLifecycleProps {
  number: number
}

const FunctionLifecycle: FC<FunctionLifecycleProps> = (props) => {
  const [num, setNum] = useState<number>(0)
  useEffect(() => {
    console.log('组件挂载完成 : componentDidMount')
    return () => {
      console.log('组件销毁 : componentWillUnmount')
    }
  }, [])
  
  useEffect(() => {
    console.log('props变化 : componentWillReceiveProps')
  }, [props])
  
  useEffect(() => {
    console.log('组件更新完成 : componentDidUpdate')
  })
  return (
      <div className={styles.root}>
        <div className={styles.content}>
          props : {props.number}
        </div>
        <div className={styles.content}>
          states : {num}
        </div>
        <Button
            className={styles.button}
            variant="contained"
            onClick={() => setNum(state => state + 1)}
        >
          改变state
        </Button>
      </div>
  )
}

export const Display: FC = () => {
  const [number, setNumber] = useState<number>(0)
  const [isRender, setRender] = useState<boolean>(true)
  return (
      <div className={styles.root}>
        <div className={styles.title}>Sample 1: FunctionLifecycle</div>
        {isRender && <FunctionLifecycle number={number}/>}
        <Button
            className={styles.button}
            variant="contained"
            onClick={() => setNumber(state => state + 1)}
        >
          改变props
        </Button>
        <Button
            className={styles.button}
            variant="contained"
            onClick={() => setRender(state => !state)}
        >
          卸载/加载组件
        </Button>
      </div>
  )
}
