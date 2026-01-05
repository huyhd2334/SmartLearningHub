import BackButton from '@/components/BackButton'
import NavigationHome from '@/components/NavigateHomPage'
import ProgressHeader from '@/components/ProgressComponents/ProgressHeader.jsx'
import ProgressMain from '@/components/ProgressComponents/ProgressMain.jsx'
import React, { useEffect } from 'react'

const PageProgress = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
  const langue = JSON.parse(localStorage.getItem("langue"))?.langue
  const streak = JSON.parse(localStorage.getItem("streak"))?.streak
  useEffect(() => {
    if (user === "Guest") {
      navigate("/");
    }
  }, [user]);

  return (
    <div className='grid grid-rows-5'>
        <aside className='flex row-span-1 row-start-1 justify-center items-center text-black border-2 border-gray-100 w-full h-20 bg-gray-50'>
          <div className="w-12 h-10 absolute left-6"> <BackButton/> </div>
          <NavigationHome langue={langue}/>
        </aside>
        <aside className='flex row-span-1 row-start-2 justify-center items-end mt-5'>
            <ProgressHeader/>
        </aside>
        <aside className='flex row-span-3 row-start-3 justify-center items-start '>
            <ProgressMain user={user} langue={langue}/>
        </aside>
    </div>
  )
}

export default PageProgress
