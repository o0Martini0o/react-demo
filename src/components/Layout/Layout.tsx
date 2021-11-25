import { LayoutAside, LayoutContent, LayoutHeader } from './components'
import styles from './style/Layout.module.scss'
import { FC } from 'react'

export const Layout: FC = (props) => {
  return (
      <div className={styles.root}>
        <LayoutHeader/>
        <div className={styles.content}>
          <LayoutAside/>
          <LayoutContent>
            {props.children}
          </LayoutContent>
        </div>
      </div>
  )
}
