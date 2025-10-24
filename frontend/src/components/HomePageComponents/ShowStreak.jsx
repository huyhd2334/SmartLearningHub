import { Label } from '@radix-ui/react-dropdown-menu'
import { BicepsFlexed, Zap } from 'lucide-react'
import React from 'react'

const ShowStreak = ({user,streak}) => {
  return (
    <div className='flex flex-row space-x-10 justify-cetner items-cetner text-black font-semibold'>
        <Label> <BicepsFlexed/> {user} </Label>
        <Label> <Zap/> {streak} </Label>

    </div>
  )
}

export default ShowStreak
