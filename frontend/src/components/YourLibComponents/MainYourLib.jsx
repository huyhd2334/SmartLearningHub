import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import api from '@/lib/axios'
const MainYourLib = ({user, langue}) => {
    const [vocabList, setVocabList] = useState([])
    useEffect(() => {
        const fetchVocab = async () => {
            try {
                const res = await api.post("/getuservocab", {accountName: user, langue: langue})
                if(res.data.vocabs){
                    setVocabList(res.data.vocabs)
                    toast.success("receive data")
                    console.log("res.data:", res.data.vocabs);
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchVocab()
    }, [user])
  return (
    <div className='relative z-10 border-2 border-black rounded-8xl rounded-lg p-5 justify-center items-center text-black w-300'>
      <span className="absolute -top-3 left-4 bg-green-300 px-2 text-sm font-semibold rounded-8xl rounded-lg">
        Vocabulary
      </span>
      <ul className="flex flex-col space-y-2">
        {vocabList.map((vocab, idx) => (
          <li className="flex flex-row space-x-2" key={idx}> <Button size="xl" className="w-280 h-5">{vocab.vocab} {vocab.type} / {vocab.meaning} / {vocab.example}</Button> 
                         <Button size="xl" className="w-5 h-5 bg-blue-400">{vocab.level}</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default MainYourLib
