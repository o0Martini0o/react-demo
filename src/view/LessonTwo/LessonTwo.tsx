import React, { FC } from 'react'
import { EventBus, PropsAndCallback } from '@/view/LessonTwo/components'
import styles from './LessonTwo.module.scss'

export const LessonTwo: FC = () => {
  return (
      <div className={styles.root}>
        <PropsAndCallback/>
        <EventBus/>
        {/*TODO : ref方式 , React-redux 或 React-mobx 状态管理方式 , context 上下文方式*/}
      </div>
  )
}
