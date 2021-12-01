import styles from './LayoutHeader.module.scss'
import { FC } from 'react'
import { useRouter } from 'next/router'

export const LayoutHeader: FC = (props) => {
  const router = useRouter()
  const toUpperCaseFirstCharacter = (str: string | string[] | undefined): string => str ? str[0].toUpperCase() + str.slice(1) : 'Homepage'
  return (
      <div className={styles.root}>
        My React-Next-Improve-Guide Project :
        <span className={styles.lesson}>
          {toUpperCaseFirstCharacter(router?.query?.lesson)}
        </span>
      </div>
  )
}
