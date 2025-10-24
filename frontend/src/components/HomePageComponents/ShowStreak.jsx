import { Label } from '@radix-ui/react-dropdown-menu'
import { BicepsFlexed, Zap } from 'lucide-react'
import React from 'react'

const ShowStreak = ({user,streak}) => {
  return (
    <div className='flex flex-row space-x-10 justify-cetner items-center text-black font-semibold'>
      <div className='flex flex-row justify-center items-center space-x-3'>
         <BicepsFlexed/>
        <div className='flex flex-row justify-center items-center border-2 border-xl rounded-4xl bg-green-500 w-25 h-10'>
           {user} 
        </div>
      </div>

      <div className='flex flex-row justify-center items-center space-x-3'>
        <Zap/>
        <a> Streak </a>
        <div className='flex flex-row justify-center items-center border-2 border-xl rounded-4xl bg-yellow-500 w-15 h-10'>
           {streak} 
        </div>
      </div>
    </div>
  )
}

export default ShowStreak
