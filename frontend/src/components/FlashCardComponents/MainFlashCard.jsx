import api from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '../ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'

const MainFlashCard = ({user, levelFlashCard, langue}) => {
    const [vocabList, setVocabList] = useState([])
    useEffect(() => {
        const getuservocab = async() => {
            try{
                console.log("Fetching:", { user, levelFlashCard, langue })
                const res = await api.post("/getuservocab",{accountName: user, level: levelFlashCard, langue: langue})
                if(res.data.vocabs){
                    setVocabList(res.data.vocabs)
                    console.log(res.data.vocabs)
                    toast.success(`get ${user} data`)

                }
        }catch(error){
            console.error(error)
        }
    }
    getuservocab()
},[user, levelFlashCard, langue])
    const upDateLevel = async (vocab, up) => {
      const update = await api.post("/update", {accountName: user, vocab: vocab, langue: langue, iscorrect: up});
      
      console.log("Fetching:", { user, levelFlashCard, langue })
      if(update.data.success){
        const res = await api.post("/getuservocab", { accountName: user, level: levelFlashCard, langue: langue});
        if (res.data.vocabs) setVocabList(res.data.vocabs);
      }
    }

  return (
    <Carousel className="w-full max-w-2xl mx-auto">
    <CarouselContent>
        {vocabList.map((vocab, idx) => (
          <CarouselItem key={idx}>
            <Card className="flex flex-col p-6 space-y-4 min-h-[350px] w-full max-w-md justify-center items-center text-center">
              {langue === "english" ? (
              <>
              <p className="text-xl font-bold">{vocab.vocab} {vocab.pron}</p>
              <p>{vocab.type}</p>
              <p>{vocab.meaning}</p>
              {vocab.example && <p className="italic text-sm">{vocab.example}</p>}
              {levelFlashCard < 6 && 
              <div className='flex gap-3 mt-4'>
                <Button className="px-4 py-2" onClick={() => upDateLevel(vocab.vocab, true)}> Up! </Button>
                <Button className="px-4 py-2 bg-red-600" onClick={() => upDateLevel(vocab.vocab, false)} disabled={levelFlashCard === 0}> Down </Button>
              </div>
              }
              {levelFlashCard === 6 && 
              <div className='flex gap-3 mt-4 items-center'>
                <Label className="px-4 py-2 bg-blue-500 rounded-xl text-white "> <a>Max</a> </Label>
                <Button className="px-4 py-2 bg-red-600" onClick={() => upDateLevel(vocab.vocab, false)}> Down </Button>
              </div>}              </>
              ):

              // chinese mode
              (
              <>
              <p className="text-xl font-bold">{vocab.vocab}</p>
              <p>{vocab.meaning}</p>
              <p>{vocab.english}</p>
              {Number(levelFlashCard) < 6 &&
              (<div className='flex gap-3 mt-4'>
                <Button className="px-4 py-2" onClick={() => upDateLevel(vocab.vocab,vocab.meaning,vocab.english, vocab.pinyin)} disabled={levelFlashCard === 0}> Up! </Button>
                <Button className="px-4 py-2 bg-red-600"> Down </Button>
              </div>)
              }
              {Number(levelFlashCard) === 6 && 
              <div className='flex gap-3 mt-4'>
                <Label className="px-4 py-2 bg-blue-500 rounded-4xl flex items-center justify-center text-white "> <a>Max</a> </Label>
                <Button className="px-4 py-2 bg-red-600"> Down </Button>
              </div>}
              </>
              )}
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

