import React, { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { toast } from 'sonner'

const TopicMain = ({langue}) => {
  const [getData, setGetData] = useState(true)
  const [topics, setTopics] = useState([])
  useEffect(() => {
    const getTopic = async() => {
      try {
        toast.info(langue)
        const res = await api.post("/getallvocabstopic", {langue: langue})
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
  return (
    <div className='grid grid-cols-2 gap-5'>
        {topics.map((topic, index) => (
          index % 2 === 0 
            ? (
                <ul key={index} className='col-start-1 rounded-4xl bg-blue-100 text-black w-[300px] h-[100px] text-2xl text-center items-center '>
                  {topic}
                </ul>
              )
            : (
                <ul key = {index} className='col-start-2 rounded-4xl bg-blue-100 text-black w-[300px] h-[100px] text-2xl text-center items-center '>
                  {topic}
                </ul>
              )
          ))}
    </div>
  )
}

export default TopicMain
