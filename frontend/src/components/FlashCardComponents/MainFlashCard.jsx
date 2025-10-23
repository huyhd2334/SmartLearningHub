import api from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MainFlashCard = ({user}) => {
    const [vocabList, setVocabList] = useState([])
    useEffect(() => {
        const getuservocab = async() => {
            try{
                const res = await api.post("/getuservocab",{accountName: user})
                if(res.data){
                    setVocabList(res.data)
                    toast.success(`get ${user} data`)

                }
        }catch(error){
            console.error(error)
        }
    }
    getuservocab()
},[user])
  return (
    <Carousel className="w-full max-w-xs">
    <CarouselContent>
        {vocabList.map((vocab, idx) => (
        <CarouselItem key={idx}>
            <Card className="flex flex-col p-4 space-y-2 h-90 w-80 justify-center items-center">
            <p className="text-xl font-bold">{vocab.vocab} {vocab.pron}</p>
            <p>{vocab.type}</p>
            <p>{vocab.meaning}</p>
            {vocab.example && <p className="italic text-sm">{vocab.example}</p>}
            </Card>
        </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    </Carousel>
  )
}
export default MainFlashCard

