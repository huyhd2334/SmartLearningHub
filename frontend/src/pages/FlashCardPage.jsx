import ChoseLevelFlashCard from '@/components/FlashCardComponents/ChoseLevelFlashCard';
import { DashMenuFlashCard } from '@/components/FlashCardComponents/DashMenuFlashCard';
import HeaderFlashCard from '@/components/FlashCardComponents/HeaderFlashCard';
import MainFlashCard from '@/components/FlashCardComponents/MainFlashCard';
import { Award, ChartNoAxesCombined } from 'lucide-react';
import { useEffect, useState } from 'react'
import {useNavigate } from 'react-router';
import { toast } from 'sonner';

const FlashCardPages = () => {
    const [levelFlashCard, setLevelFlashCard] = useState(0)
    const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
    const langue = JSON.parse(localStorage.getItem("langue"))?.langue
    const streak = JSON.parse(localStorage.getItem("streak"))?.streak
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
      toast.success(`${user} flashcards`)
    }, [user, navigate]);
  return (
    <div>
     <div className='flex flex-col min-h-screen justify-center items-center text-black space-y-10 translate-y-[30px]'>
       <div className='absolute top-1 left-[600px]'> <HeaderFlashCard user={user} levelFlashCard={levelFlashCard}/> </div>
       <div className='absolute top-25 left-[600px]'> <MainFlashCard user={user} levelFlashCard={levelFlashCard} langue={langue}/></div>
       <div className='absolute top-1 left-10'><DashMenuFlashCard user={user} streak={streak} langue={langue}/></div>
       <div className='absolute top-1 right-[50px] flex flex-row space-x-5'><ChartNoAxesCombined className='w-7 h-7'/> <Award className='w-7 h-7'/> </div>
       <div className='absolute top-30 left-[275px] flex flex-row space-x-5'><ChoseLevelFlashCard setLevelFlashCard={setLevelFlashCard}/></div>
     </div>
    </div>
  )
}

export default FlashCardPages
