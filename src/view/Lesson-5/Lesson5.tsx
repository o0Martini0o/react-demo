import React, { FC } from 'react'
import { FunctionLifecycle } from '@/view/Lesson-5/components'
import styles from './Lesson-5.module.scss'

export const Lesson5: FC = () => {
  return (
      <>
        <div className={styles.lessonTitle}>第五课:理解LifCycle</div>
        <div className={styles.root}>
          <FunctionLifecycle/>
        </div>
      </>
  )
}
