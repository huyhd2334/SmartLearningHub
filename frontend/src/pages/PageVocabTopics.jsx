import TopicHeader from '@/components/ComponentTopic/TopicHeader.jsx'
import TopicMain from '@/components/ComponentTopic/TopicMain.jsx'
import { useLocation } from 'react-router'

const PageVocabTopics = () => {
  const location = useLocation()
  const langue = location.state?.langue 
  return (
    <div className='grid grid-cols-4 gap-10'>
        <aside className='col-span-4'>
            <TopicHeader langue = {langue}/>
        </aside>
        <aside className='col-span-2 col-start-2'>
            <TopicMain langue = {langue}/>
        </aside>
    </div>
  )
}

export default PageVocabTopics
