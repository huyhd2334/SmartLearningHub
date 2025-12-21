import TopicHeader from '@/components/ComponentTopic/TopicHeader.jsx'
import TopicMain from '@/components/ComponentTopic/TopicMain.jsx'
import NavigationHome from '@/components/NavigateHomPage'
import { useLocation } from 'react-router'

const PageVocabTopics = () => {
  const location = useLocation()
  const langue = location.state?.langue 
  return (
    <div className='grid grid-cols-4 gap-10'>
        <aside className='col-span-4 text-black gap-5'>
            <div className='h-20 flex justify-center items-center border-2 border-gray-100 w-full bg-gray-50'><NavigationHome/></div>
            <TopicHeader langue = {langue}/>
        </aside>
        <aside className='col-span-2 col-start-2'>
            <TopicMain langue = {langue}/>
        </aside>
    </div>
  )
}

export default PageVocabTopics
