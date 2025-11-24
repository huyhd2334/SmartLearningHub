import React, { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { toast } from 'sonner'
import { Button } from '../ui/button'

const ShowAllVocab = ({ value, setDataReady, user, langue }) => {
  const [vocabList, setVocabList] = useState([])
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchVocab = async () => {
    try {
        const res = await api.post("/get100vocab", { offset: (value-1) * 100 + 1 , langue: langue},
                                                   {headers: {Authorization: `Bearer ${accessToken}`},
                                                   withCredentials: true })
        toast.success(`get page ${value}`)
        if(res.data){
          setDataReady(true)
          setVocabList(res.data)
          console.log("langue", langue)
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
    const addVocabulary = async(vocab,pron,type,meaning,example) =>{
       try{
          await api.post("/adduservocab",{accountName: user, vocab, pron, type, meaning, example, langue: langue},
                                                           {headers: {Authorization: `Bearer ${accessToken}`},
                                                           withCredentials: true })
          toast.success(`Saving ${vocab}`)
       }catch(error){
        console.error(error)
       }
    }
    const addChinsesVocabulary = async(vocab,meaning,english,pinyin) =>{
       try{
          await api.post("/adduservocab",{accountName: user, vocab, meaning, english, pinyin, langue: langue},
                                                           {headers: {Authorization: `Bearer ${accessToken}`},
                                                           withCredentials: true })
          toast.success(`Saving ${vocab}`)
       }catch(error){
        console.error(error)
       }
    }
  return (
    <div className='relative z-10 border-2 border-black rounded-8xl rounded-lg p-5 justify-center items-center text-black w-300'>
      <span className="absolute -top-3 left-4 bg-green-300 px-2 text-sm font-semibold rounded-8xl rounded-lg">
        Vocabulary
      </span>
      <ul>
        {vocabList.map((vocab, idx) => (
          <li key={idx}> 
              {langue === "english"
                  ? <Button size="xl" className="w-280 h-5" onClick={() => addVocabulary(vocab.vocab,vocab.pron,vocab.type,vocab.meaning,vocab.example)}>
                      {vocab.vocab} {vocab.type} {vocab.meaning}
                    </Button>

                  : <Button size="xl" className="w-280 h-5 bg-blue-400" onClick={() => addChinsesVocabulary(vocab.vocab,vocab.meaning,vocab.english, vocab.pinyin)}>
                      {vocab.vocab} {vocab.pinyin} {vocab.meaning}
                    </Button>}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ShowAllVocab
