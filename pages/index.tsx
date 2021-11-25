import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { Homepage } from '@/view/Homepage/Homepage'

const Home: NextPage = () => {
  return (
      <Layout>
        <Homepage/>
      </Layout>
  )
}

export default Home
