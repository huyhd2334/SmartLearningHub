import React from 'react'
import { Button } from '../ui/button'
import { handler } from 'tailwindcss-animate'

const ChoseLevelFlashCard = ({setLevelFlashCard}) => {
  const handlerLevel = (level) => {
    setLevelFlashCard(level)
  }
  return (
    <div className='flex flex-col justify-center items-center space-y-3'>
        <Button className="relative px-6 py-3 w-40 font-semibold
                           bg-white text-black-500 border-2 border-white overflow-hidden group rounded-xl cursor-pointer"
                           onClick={()=> handlerLevel(0)}>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left rounded-tr-full bg-blue-500 rounded-br-full group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-right rounded-tl-full bg-blue-500 group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-800">Level 0</span>
        </Button>
        <Button className="relative px-6 py-3 w-40 font-semibold
                           bg-white text-black-500 border-2 border-white overflow-hidden group rounded-xl cursor-pointer"
                           onClick={()=> handlerLevel(1)}>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left rounded-tr-full bg-blue-500 rounded-br-full group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-right rounded-tl-full bg-blue-500 group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-800">Level 1</span>
        </Button>
        <Button className="relative px-6 py-3 w-40 font-semibold
                           bg-white text-black-500 border-2 border-white overflow-hidden group rounded-xl cursor-pointer"
                           onClick={()=> handlerLevel(2)}>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left rounded-tr-full bg-blue-500 rounded-br-full group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-right rounded-tl-full bg-blue-500 group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-800">Level 2</span>
        </Button>
        <Button className="relative px-6 py-3 w-40 font-semibold
                           bg-white text-black-500 border-2 border-white overflow-hidden group rounded-xl cursor-pointer"
                           onClick={()=> handlerLevel(3)}>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left rounded-tr-full bg-blue-500 rounded-br-full group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-right rounded-tl-full bg-blue-500 group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-800">Level 3</span>
        </Button>
        <Button className="relative px-6 py-3 w-40 font-semibold
                           bg-white text-black-500 border-2 border-white overflow-hidden group rounded-xl cursor-pointer"
                           onClick={()=> handlerLevel(4)}>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left rounded-tr-full bg-blue-500 rounded-br-full group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-right rounded-tl-full bg-blue-500 group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-800">Level 4</span>
        </Button>
        <Button className="relative px-6 py-3 w-40 font-semibold
                           bg-white text-black-500 border-2 border-white overflow-hidden group rounded-xl cursor-pointer"
                           onClick={()=> handlerLevel(5)}>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left rounded-tr-full bg-blue-500 rounded-br-full group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-right rounded-tl-full bg-blue-500 group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-800">Level 5</span>
        </Button>
        <Button className="relative px-6 py-3 w-40 font-semibold
                           bg-white text-black-500 border-2 border-white overflow-hidden group rounded-xl cursor-pointer"
                           onClick={()=> handlerLevel(6)}>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-left rounded-tr-full bg-blue-500 rounded-br-full group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="absolute inset-0 w-full h-full transform scale-x-0 origin-right rounded-tl-full bg-blue-500 group-hover:scale-x-100 transition-transform duration-800 ease-in-out z-0"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-800">Level 6</span>
        </Button>
    </div>
  )
}

export default ChoseLevelFlashCard
