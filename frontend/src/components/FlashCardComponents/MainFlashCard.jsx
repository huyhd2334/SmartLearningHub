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
import { Button } from '../ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'

const MainFlashCard = ({user, levelFlashCard}) => {
    const [vocabList, setVocabList] = useState([])
    const [refresh, setReFresh] = useState(false)
    useEffect(() => {
        const getuservocab = async() => {
            try{
                const res = await api.post("/getuservocab",{accountName: user, level: levelFlashCard})
                if(res.data){
                    setVocabList(res.data)
                    toast.success(`get ${user} data`)

                }
        }catch(error){
            console.error(error)
        }
    }
    getuservocab()
},[user, levelFlashCard, refresh])
  const upLevel = async(idx,vocab, pron, type, meaning, example) => {
    const accountName = user
    const up = await api.post("/AddUserVocab",{accountName, vocab, pron, type, meaning,example})
    setVocabList(vocabList.splice(idx, 1))
    setReFresh(!refresh)
  }
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
            {levelFlashCard < 6 && <div><Button className="w-7 h-5" onClick={() => upLevel(idx,vocab.vocab,vocab.pron,vocab.type,vocab.meaning,vocab.example)}> Up! </Button></div>}
            {levelFlashCard === 6 && <div><Label className="w-15 h-6 bg-blue-500 rounded-4xl flex items-center justify-center text-white "> <a>max</a> </Label></div>}

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

