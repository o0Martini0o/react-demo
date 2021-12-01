import React, { useState, FC, ChangeEvent } from 'react'
import styles from './styles/Sample.module.scss'

export const Father: FC = () => {
  const [fatherSay, setFatherSay] = useState<string>('')
  const [childSay, setChildSay] = useState<string>('')
  
  return (
      <div className={styles.root}>
        <div className={styles.title}>通讯方式一 : Props 和 Callback 方式</div>
        <div className={styles.contentWrap}>
          <div className={styles.fatherWrap}>
            <div className={styles.subTitle}> 我是父组件</div>
            <div className={styles.content}> 子组件对父组件说:{childSay}</div>
            <input
                placeholder="我对子组件说"
                type="text"
                onInput={(e: ChangeEvent<HTMLInputElement>) => setFatherSay(e.target.value)}
            />
          </div>
          <Child fatherSay={fatherSay} sayToFather={setChildSay}/>
        </div>
      </div>
  )
}

interface ChildProps {
  sayToFather: (str: string) => void
  fatherSay: string
}

const Child: FC<ChildProps> = (props) => {
  const { sayToFather, fatherSay } = props
  return (
      <div className={styles.childWrap}>
        <div className={styles.subTitle}> 我是子组件</div>
        <div className={styles.content}> 父组件对子组件说 : {fatherSay}</div>
        <input
            placeholder="我对父组件说"
            type="text"
            onInput={(e: ChangeEvent<HTMLInputElement>) => sayToFather(e.target.value)}
        />
      </div>
  )
}

