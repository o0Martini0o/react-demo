import { FC } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { Lesson1 } from '@/view/Lesson-1'
import { Lesson2 } from '@/view/Lesson-2'

const Lesson: FC = () => {
  const router = useRouter()
  const { lesson } = router.query
  const renderLesson: (id: string) => JSX.Element = (id) => {
    switch (id) {
      case 'lesson-one':
        return <Lesson1/>
      case 'lesson-two':
        return <Lesson2/>
      default:
        return <div>id not match</div>
    }
  }
  
  return (
      <Layout>
        {renderLesson(lesson as string)}
      </Layout>
  )
}
export default Lesson
