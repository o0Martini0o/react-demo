import { FC } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { Lesson1, Lesson2, Lesson4, Lesson5 } from '@/view'
import { Lesson6 } from '@/view/Lesson-6/Lesson-6'

const Lesson: FC = () => {
  const router = useRouter()
  const { lesson } = router.query
  const renderLesson: (id: string) => JSX.Element = (id) => {
    switch (id) {
      case 'lesson-one':
        return <Lesson1/>
      case 'lesson-two':
        return <Lesson2/>
      case 'lesson-four':
        return <Lesson4/>
      case 'lesson-five':
        return <Lesson5/>
      case 'lesson-six':
        return <Lesson6/>
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
