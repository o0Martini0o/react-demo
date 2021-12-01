import styles from '../style/LayoutAside.module.scss'
import { FC } from 'react'
import { List, ListItem } from '@mui/material'
import { useRouter } from 'next/router'

interface Lesson {
  title: string,
  path: string
}

const LessonArr: Lesson[] = [
  { title: 'Homepage', path: '/' },
  { title: 'lesson-one', path: '/lesson-one' },
  { title: 'lesson-two', path: '/lesson-two' },
  { title: 'lesson-there', path: '/lesson-there' },
]

export const LayoutAside: FC = () => {
  const router = useRouter()
  const redirectionTo = (path: string) => router.push(path)
  return (
      <div className={styles.root}>
        <List className={styles.list}>
          {LessonArr.map((item, index) => (
              <ListItem key={index} button onClick={() => redirectionTo(item.path)} className={styles.item}>
                {item.title}
              </ListItem>
          ))}
        </List>
      </div>
  )
}
