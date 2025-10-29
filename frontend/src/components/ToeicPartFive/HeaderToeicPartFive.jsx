import { BookOpenText } from 'lucide-react'
import React from 'react'

const HeaderToeicPartFive = () => {
  return (
    <div className='flex flex-row space-x-5 justify-center items-center'>
       <BookOpenText className='w-7 h-7 text-black'/>
       <div className=' flex flex-row font-semibold border-2 border-blue-600 bg-blue-600 rounded-4xl w-30 h-10 justify-center items-center text-white font-bold text-lg '> Part 5</div>
    </div>
  )
}

export default HeaderToeicPartFive
