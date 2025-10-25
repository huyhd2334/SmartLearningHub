import React from 'react'

const HeaderFlashCard = ({levelFlashCard}) => {
  return (
    <div className='flex flex-row text-4xl text-semibold space-x-5'>
      <h1>Flash Cards</h1>
      <span className='flex border-blue bg-blue-500 justify-center items-center text-center font-bold text-sm text-white border-2 rounded-4xl w-30 h-10'> level {levelFlashCard}</span >
    </div>
  )
}

export default HeaderFlashCard
