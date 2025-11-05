import ChoseLevelFlashCard from '@/components/FlashCardComponents/ChoseLevelFlashCard';
import { DashMenuFlashCard } from '@/components/FlashCardComponents/DashMenuFlashCard';
import HeaderFlashCard from '@/components/FlashCardComponents/HeaderFlashCard';
import MainFlashCard from '@/components/FlashCardComponents/MainFlashCard';
import { Award, ChartNoAxesCombined } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

const FlashCardPages = () => {
    const [levelFlashCard, setLevelFlashCard] = useState(0)
    const location = useLocation()
    const streak = location.state?.streak ?? 0; 
    const user = location.state?.user || "Guest"; 
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
      toast.success(`${user} flashcards`)
    }, [user, navigate]);
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-black space-y-10 translate-y-[30px]'>
       <HeaderFlashCard user={user} levelFlashCard={levelFlashCard}/>
       <MainFlashCard user={user} levelFlashCard={levelFlashCard} />
       <div className='absolute top-1 left-10'><DashMenuFlashCard user={user} streak={streak}/></div>
       <div className='absolute top-1 left-300 flex flex-row space-x-5'><ChartNoAxesCombined className='w-7 h-7'/> <Award className='w-7 h-7'/> </div>
       <div className='absolute top-25 left-65 flex flex-row space-x-5'><ChoseLevelFlashCard setLevelFlashCard={setLevelFlashCard}/></div>
    </div>
  )
}

export default FlashCardPages
