import TopicMain from '@/components/TopicComponents/TopicMain.jsx'
import NavigationHome from '@/components/NavigateHomPage'
import { useLocation } from 'react-router'

const PageVocabTopics = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
  const langue = JSON.parse(localStorage.getItem("langue"))?.langue
  const streak = JSON.parse(localStorage.getItem("streak"))?.streak
  return (
    <div className='grid grid-cols-4 gap-y-5'>
        <aside className='flex flex-col col-span-4 text-black gap-y-5'>
            <div className='h-20 flex justify-center items-center border-2 border-gray-100 w-full bg-gray-50'><NavigationHome langue={langue}/></div>
        </aside>
        <aside className='flex flex-row col-span-2 col-start-1 ml-55 space-x-64'>
            <TopicMain langue = {langue}/>
        </aside>
    </div>
  )
}

export default PageVocabTopics
