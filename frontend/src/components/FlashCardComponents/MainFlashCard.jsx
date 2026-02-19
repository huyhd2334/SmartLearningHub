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
    const upDateLevel = async (vocab, english, pinyin, up) => {
      await api.post("/update", {accountName: user, vocab: vocab, langue: langue, up});
      console.log("Fetching:", { user, levelFlashCard, langue })
      const res = await api.post("/getuservocab", { accountName: user, level: levelFlashCard, langue: langue, english: english, pinyin: pinyin });
      if (res.data.vocabs) setVocabList(res.data.vocabs);
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
              {levelFlashCard < 6 && <div><Button className="w-7 h-5" onClick={() => upDateLevel(vocab.vocab,vocab.pron,vocab.type,vocab.meaning,vocab.example)}> Up! </Button></div>}
              {levelFlashCard === 6 && <div><Label className="w-15 h-6 bg-blue-500 rounded-4xl flex items-center justify-center text-white "> <a>max</a> </Label></div>}
              </>
              ) : (
              <>
              <p className="text-xl font-bold">{vocab.vocab}</p>
              <p>{vocab.meaning}</p>
              <p>{vocab.english}</p>
              {levelFlashCard < 6 && 
              <div className='flex gap-3 mt-4'>
                <Button className="px-4 py-2" onClick={() => upDateLevel(vocab.vocab,vocab.meaning,vocab.english, vocab.pinyin)}> Up! </Button>
                <Button className="px-4 py-2 bg-red-600"> Down </Button>
              </div>
              }
              {levelFlashCard === 6 && 
              <div className='flex gap-3 mt-4'>
                <Label className="px-4 py-2 bg-blue-500 rounded-4xl flex items-center justify-center text-white "> <a>max</a> </Label>
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

