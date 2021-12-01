import { BusService } from '@/utils/EventBus'
import React, { FC, useState, useEffect } from 'react'
import styles from './styles/Sample.module.scss'

export const Father = () => {
  const [childSay, setChildSay] = useState<string>('')
  
  useEffect(() => {
    BusService.on('childSayToFather', (value: string) => setChildSay(value))
    console.log('EventBus', BusService)
    return () => BusService.off('childSayToFather')
  }, [])
  
  return (
      <div className={styles.root}>
        <div className={styles.title}>
          通讯方式二 : EventBus 事件总线
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.fatherWrap}>
            <div className={styles.subTitle}>
              我是父组件
            </div>
            <div className={styles.content}>
              子组件对我说 : {childSay}
            </div>
            <input
                placeholder="我对子组件说"
                onChange={(e) => BusService.emit('fatherSayToChild', e.target.value)}
            />
          </div>
          <Child/>
        </div>
      </div>
  )
}

const Child = () => {
  const [fatherSay, setFatherSay] = useState<string>('')
  
  useEffect(() => {
    BusService.on('fatherSayToChild', (value: string) => setFatherSay(value))
    return () => BusService.off('fatherSayToChild')
  }, [])
  
  return (
      <div className={styles.childWrap}>
        <div className={styles.fatherWrap}>
          <div className={styles.subTitle}>
            我是子组件
          </div>
          <div className={styles.content}> 父组件对我说 : {fatherSay} </div>
          <input
              placeholder="我对父组件说"
              onChange={(e) => BusService.emit('childSayToFather', e.target.value)}
          />
        </div>
      </div>
  )
}
