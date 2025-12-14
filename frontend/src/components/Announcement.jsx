import React from 'react'

const Announcement = ({streak, userName, langue}) => {
  return (
      <div onClick={(e) => e.stopPropagation()} 
           className={`relative inset-0 w-[900px] h-[500px] ${langue === "english" ? "bg-[url('english.png')]" : "bg-[url('chinese.png')]"} bg-cover bg-center rounded-3xl`}>
        <div className='absolute flex flex-row items-center  top-[57px] left-[630px] text-4xl font-bold text-white'> Streak: {streak}</div>
        <div className='absolute flex flex-row items-center  top-[215px] left-[180px] text-4xl font-bold text-white'> {userName} </div>
      </div>
  )
}

export default Announcement
