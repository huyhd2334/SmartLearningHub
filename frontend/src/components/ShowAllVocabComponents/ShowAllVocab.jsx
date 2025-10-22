import React, { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { toast } from 'sonner'
import { Button } from '../ui/button'

const ShowAllVocab = ({ value, setDataReady  }) => {
  const [vocabList, setVocabList] = useState([])
  useEffect(() => {
    const fetchVocab = async () => {
    try {
        const res = await api.post("/get100vocab", { offset: (value-1) * 100 + 1 })
        toast.success(`get page ${value}`)
        if(res.data){
          setDataReady(true)
          setVocabList(res.data)
          console.log("res.data:", res.data);
        } else {
          setDataReady(false)
        }
      } catch (error) {
        console.error(error)
        setDataReady(false)
      }
    }
    if(value >= 1){ 
      fetchVocab()
    }}, [value])
  return (
    <div className='relative z-10 border-2 border-black rounded-8xl rounded-lg p-5 justify-center items-center text-black'>
      <span class="absolute -top-3 left-4 bg-green-300 px-2 text-sm font-semibold rounded-8xl rounded-lg">
        Vocabulary
      </span>
      <ul>
        {vocabList.map((vocab, idx) => (
          <li key={idx}> <Button size="xl" className="w-150 h-5">{vocab.vocab} {vocab.type} / {vocab.meaning}</Button></li>
        ))}
      </ul>
    </div>
  )
}

export default ShowAllVocab
