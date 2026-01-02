import React, { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { toast } from 'sonner'
import { Button } from '../ui/button'

const TopicMain = ({langue}) => {
  const [getData, setGetData] = useState(true)
  const [topicVocabs, setTopicVocabs] = useState("")
  const [topics, setTopics] = useState([])
  const [currTopic, setCurrTopic] = useState("")
  const [animateTopic, setAnimateTopic] = useState(false)

  useEffect(() => {
    const getTopic = async() => {
      try {
        setAnimateTopic(true)
        toast.info(langue)
        const res = await api.post("/getvocabstopic", {langue: langue, topic: ""})
        if(res.data.topics){
          console.log("get topic", langue)
          setTopics(res.data.topics)
        }else{console.log("error when get topic")}
      } catch (error) {
        console.log("error server when get topic")
      }
    }
    if(getData){
      getTopic()
    }
  }, [langue])
  
  const getTopicVocab = async(topicSelect) => {
        try {
          const res = await api.post("/getvocabstopic", {langue: langue, topic: topicSelect})
          setCurrTopic(topicSelect)
          if(res.data.vocabs){
            setTopicVocabs(res.data.vocabs)
            console.log(res.data.vocabs)
            toast.success(topicSelect)
          }else{console.log("back end error when return topic vocabs")}
        } catch (error) {
          console.error(error)
          toast.error("error when get topic vocabs")
        }   
    }
  return (
    <div className="grid grid-cols-4 gap-x-90 gap-y-3 justify-items-center">
      {topicVocabs === "" 
      ? topics.map((topic, index) => (
        <div
          key={index}
          onClick={()=>{getTopicVocab(topic)}}
          className="flex items-center justify-center text-black text-2xl hover:scale-105 transition">
          <Button className="w-[350px] h-[150px] text-xl"> {topic} </Button>
        </div>
      ))
      :
      <div className='flex flex-row relative justify-center items-center w-full min-h-screen col-span-4 col-start-1 '>
        <Button onClick={() => {setTopicVocabs("")}} className='absolute top-60 left-1/4 -translate-x-[300px] -translate-y-[200px] w-[470px] h-[400px] text-4xl rounded-4xl'>
            {currTopic}
        </Button>
        <ul className="flex flex-col space-y-2 absolute top-10 left-[500px] w-[700px] h-[400px] overflow-y-auto">       
            {topicVocabs.map((vocab, idx)=>(
             <Button key={idx} className='flex flex-row space-x-2 text-xl text-white justify-start items-start w-full h-14 pl-10 '>
                {vocab.vocab} {vocab.meaning}
             </Button>
          ))}
        </ul>
      </div>
      }
    </div>
  )
}
export default TopicMain
