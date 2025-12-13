import React from 'react'

const Announcement = () => {
  return (
    <div onClick={(e) => e.stopPropagation()} className="relative w-[900px] h-[500px] bg-[url('announcement.png')] bg-cover bg-center rounded-3xl">
    </div>
  )
}

export default Announcement
