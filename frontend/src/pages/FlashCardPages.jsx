import { DashMenuFlashCard } from '@/components/FlashCardComponents/DashMenuFlashCard';
import HeaderFlashCard from '@/components/FlashCardComponents/HeaderFlashCard';
import MainFlashCard from '@/components/FlashCardComponents/MainFlashCard';
import { Award, ChartNoAxesCombined } from 'lucide-react';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

const FlashCardPages = () => {
    const location = useLocation()
    const user = location.state?.user || "Guest"; 
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
      toast.success(`${user} flashcards`)
    }, [user, navigate]);
  return (
    <div className='flex flex-col justify-center items-center text-black space-y-10 translate-y-[30px]'>
       <HeaderFlashCard user={user}/>
       <MainFlashCard user={user}/>
       <div className='absolute top-1 left-10'><DashMenuFlashCard user={user}/></div>
       <div className='absolute top-1 left-300 flex flex-row space-x-5'><ChartNoAxesCombined className='w-7 h-7'/> <Award className='w-7 h-7'/> </div>
    </div>
  )
}

export default FlashCardPages
