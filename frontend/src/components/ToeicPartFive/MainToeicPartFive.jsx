import api from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { CircleCheckBig, CircleX } from 'lucide-react'

const MainToeicPartFive = ({user, streak}) => {
    const [reload, setReload] = useState(false)
    const [questionList, setQuestionList] = useState([])
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [correctCheck, setCorrectCheck] = useState([])
    const [incorrectCheck, setIncorrectCheck] = useState([])    
    useEffect(()=>{
        const getQuestions = async() => {
            try{
                const question = await api.post("/questionpartfive",{questionpartfive: "get"})
                if(question.data.questions){
                    setQuestionList(question.data.questions)
                    toast.success("questions already!")
                }else{toast.error("error")}
            }catch(error){console.error(error)}
        }
        getQuestions()
    },[user,reload])
    const checkAnswer = (index, option, answer) => {
        if(option === answer){
            setCorrect(correct + 1)
            setCorrectCheck(correctCheck => [...correctCheck, index])
            toast.success("Great")
        }else{toast.error("False")
              setIncorrect(incorrect + 1)
              setIncorrectCheck(incorrectCheck => [...incorrectCheck, index])
        }
    }
  return (
    <div className='flex flex-row space-x-5'>
      <div className='absolute top-2 left-260 flex flex-row space-x-10 justify-center items-center text-black'>
        <div className='flex flex-row space-x-3'>
          <CircleCheckBig/>
          <a>{correct}</a>
        </div>
        <div className='flex flex-row space-x-3'>
          <CircleX/>
          <a>{incorrect}</a>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <ul className='absolute top-10 left-20 flex flex-col space-y-5 text-black '>
          <li> Questions </li>
          {questionList.map((question, indexQuestion) => (
            incorrectCheck.includes(indexQuestion) ? (
            <li key={indexQuestion} className='flex flex-col space-y-3 text-black w-200'> 
              <label className='flex flex-row space-x-6'>
                <label className='text-black rounded-4xl flex flex-row justify-center items-center font-semibold'> {indexQuestion + 1} </label> 
                <a>{question.question}</a>
              </label> 
              <Button className="w-30 h-7 bg-gray-500">{question.options[0]}</Button>
              <Button className="w-30 h-7 bg-gray-500">{question.options[1]}</Button>
              <Button className="w-30 h-7 bg-gray-500">{question.options[2]}</Button>
              <Button className="w-30 h-7 bg-gray-500">{question.options[3]}</Button>
              <a className='text-red-500 font-semibold'>Correct answer: {question.answer}</a>
            </li>
            ):correctCheck.includes(indexQuestion)?(
            <li key={indexQuestion} className='flex flex-col space-y-3 text-black w-200'> 
              <label className='flex flex-row space-x-6'>
                <label className='text-black rounded-4xl flex flex-row justify-center items-center font-semibold'> {indexQuestion + 1} </label> 
                <a>{question.question}</a>
              </label> 
              <Button className="w-30 h-7 bg-gray-500">{question.options[0]}</Button>
              <Button className="w-30 h-7 bg-gray-500">{question.options[1]}</Button>
              <Button className="w-30 h-7 bg-gray-500">{question.options[2]}</Button>
              <Button className="w-30 h-7 bg-gray-500">{question.options[3]}</Button>
              <a className='text-green-500 font-semibold'>Your answer: {question.answer}</a>
            </li>
            ):(
            <li key={indexQuestion} className='flex flex-col space-y-3 text-black w-200'> 
              <label className='flex flex-row space-x-6'>
                <label className='text-black rounded-4xl flex flex-row justify-center items-center font-semibold'> {indexQuestion + 1} </label> 
                <a>{question.question}</a>
              </label> 
              <Button className="w-30 h-7" onClick={()=> checkAnswer(indexQuestion, question.options[0], question.answer)}>{question.options[0]}</Button>
              <Button className="w-30 h-7" onClick={()=> checkAnswer(indexQuestion, question.options[1], question.answer)}>{question.options[1]}</Button>
              <Button className="w-30 h-7" onClick={()=> checkAnswer(indexQuestion, question.options[2], question.answer)}>{question.options[2]}</Button>
              <Button className="w-30 h-7" onClick={()=> checkAnswer(indexQuestion, question.options[3], question.answer)}>{question.options[3]}</Button>
            </li>
            )
          ))
          }
        </ul>
      </div>
      <Button className="w-30 h-7" onClick={()=>setReload(!reload)}> Next 30 questions </Button>
    </div>
  )
}

export default MainToeicPartFive
