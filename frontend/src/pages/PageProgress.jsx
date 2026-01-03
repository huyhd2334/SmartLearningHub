import ProgressHeader from '@/components/ProgressComponents/ProgressHeader.jsx'
import ProgressMain from '@/components/ProgressComponents/ProgressMain.jsx'
import React from 'react'

const PageProgress = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
  const langue = JSON.parse(localStorage.getItem("langue"))?.langue
  const streak = JSON.parse(localStorage.getItem("streak"))?.streak
  return (
    <div className='grid grid-rows-4'>
        <aside className='flex row-span-1 row-start-1 justify-center items-center'>
            <ProgressHeader/>
        </aside>
        <aside className='flex row-span-2 row-start-2 justify-center items-center'>
            <ProgressMain user={user} langue={langue}/>
        </aside>
    </div>
  )
}

export default PageProgress
