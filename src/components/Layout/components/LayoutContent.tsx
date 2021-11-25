import styles from '../style/LayoutContent.module.scss'
import { FC } from 'react'

export const LayoutContent: FC = (props) => {
  return (
      <div className={styles.root}>
        {props.children}
      </div>
  )
}
