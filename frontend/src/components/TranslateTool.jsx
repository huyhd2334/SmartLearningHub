import { CircleArrowRight, Search } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import api from '@/lib/axios'

const TranslateTool = ({langue}) => {
    const handleSearch = async() => {
        const word = document.getElementById("search").value.replaceAll(" ", "")
        const detail = await api.post("/finddetail",{word: word, langue: langue})
        if(detail.data.detail){
            toast.loading(detail.data.detail["meaning"])
        }else{toast.error("Out of dict range")}
    }
  return (
    <div className="flex items-center justify-center bg-gray-50 w-[11px] h-[11px]">
        <Button className="relative group flex flex-row w-16 h-12 rounded-4xl">
            <div className='border-2 border-blue-500 rounded-4xl w-15 h-11 flex justify-center items-center'>
                <span className="font-semibold text-blue-600 flex flex-row items-center justify-center space-x-3 border-2 border-blue bg-blue-500 text-black-800 rounded-4xl w-14 h-10"> 
                    <Search/>
                </span>
            </div>
            <input id="search" type="text" placeholder="Type single word here..." className="absolute left-0 top-full mt-2 w-0 opacity-0 
                                                                        border border-blue-500 rounded-md px-2 py-1 
                                                                        transition-all duration-500 ease-in-out 
                                                                        group-hover:w-60 group-hover:opacity-100"/>
            <Button onClick={()=>handleSearch()} className="absolute left-55 top-12 w-0 opacity-0 transition-all duration-500 ease-in-out bg-blue-500 group-hover:w-10 rounded-2xl group-hover:opacity-100 "><CircleArrowRight/></Button>
        </Button>
    </div>
  )
}

export default TranslateTool
