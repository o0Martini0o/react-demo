import { Layout } from '@/components/Layout'
import { LessonOne } from '@/view/LessonOne'
import { FC } from 'react'
import { useRouter } from 'next/router'

const Lesson: FC = () => {
  const router = useRouter()
  const { lesson } = router.query
  const renderLesson: (id: string) => JSX.Element = (id) => {
    switch (id) {
      case 'lesson-one':
        return <LessonOne/>
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
