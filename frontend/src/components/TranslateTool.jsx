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
            toast.info(detail.data.detail["meaning"], {duration: 10000})
        }else{toast.error("Out of dict range")}
    }
  return (
    <div className="flex items-center justify-center bg-gray-50 w-[11px] h-[11px] border-2 border-green-100 rounded-4xl">
            <input id="search" type="text" placeholder="Type single word here..." className=" text-black w-100 h-7"/>
            <Button onClick={()=>handleSearch()} className="w-7 h-7"><Search/></Button>
            </div>    
  )
}

export default TranslateTool
