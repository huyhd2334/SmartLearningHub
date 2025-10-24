import { Languages } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import api from '@/lib/axios'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router'

const ChoseLangue = ({user, streak}) => {
  const navigate = useNavigate()
  const handleChoseEnglish = async() => {
    try{
      console.log("user prop in ChoseLangue:", user)
      const res = await api.post("/choseLangue", {accountName: user, langue: "English"})
      if(res.data.message){
        toast.success("English Chose!")
        navigate("/homepage", { state: { user: user, streak: streak}})
      }else{
        toast.error("Something went wrong")
      }
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className='relative z-10 flex flex-col w-140 justify-center items-center space-y-8 text-white'>
      <p className="font-mono font-bold text-5xl">CHOSE YOUR JOURNEY</p>
      <p className="font-mono font-semibold text-sm"> Welcome to SmartLearningHub! Our platform is designed to make learning English simple, effective, and fun. Join our community today and start your journey to mastering English! Pick-One-Langue-To-Start</p>
      <div className='flex flex-row justify-center items-center space-x-3 text-white'>
          <div className='flex flex-row justify-center items-center space-x-5 text-white gap-3'>
              <div className='border-2 border-green-500 rounded-8xl p-5 flex flex-col space-y-5'>
              <h1 className='text-2xl font-semibold'> English </h1>
              <Button 
                size="lg"
                className="text-black w-[250px] h-[200px] flex items-center gap-2"
                onClick={handleChoseEnglish}
                >
                  <Languages className="w-10 h-10"/> Hello 
                </Button>
              </div>
              <div className=' border-2 border-green-500 rounded-8xl rounded-lg p-5 flex flex-col space-y-5'>
              <h1 className='text-2xl font-semibold'> Comming Soon!</h1>
              <Button 
                size="lg"
                className="text-black w-[250px] h-[200px] flex items-center gap-2"
                >
                  <Languages className="w-10 h-10"/> Comming Soon
                </Button>
              </div>
          </div>
      </div>
    </div>
  )
}
export default ChoseLangue
