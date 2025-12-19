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
    const langue = location.state?.langue; 
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
      toast.success(`${user} flashcards`)
    }, [user, navigate]);
  return (
    <div className="min-h-screen w-full relative">
      {/* Aurora Dream Soft Harmony */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
          radial-gradient(ellipse 80% 60% at 60% 20%, rgba(175, 109, 255, 0.50), transparent 65%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.45), transparent 65%),
            radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.43), transparent 62%),
            radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.48), transparent 68%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
          `,
        }}
      />
      {/* Your content goes here */}
     <div className='flex flex-col min-h-screen justify-center items-center text-black space-y-10 translate-y-[30px]'>
       <div className='absolute top-1 left-125'> <HeaderFlashCard user={user} levelFlashCard={levelFlashCard}/> </div>
       <div className='absolute top-25 left-125 '> <MainFlashCard user={user} levelFlashCard={levelFlashCard} langue={langue}/></div>
       <div className='absolute top-1 left-10'><DashMenuFlashCard user={user} streak={streak} langue={langue}/></div>
       <div className='absolute top-1 left-300 flex flex-row space-x-5'><ChartNoAxesCombined className='w-7 h-7'/> <Award className='w-7 h-7'/> </div>
       <div className='absolute top-30 left-65 flex flex-row space-x-5'><ChoseLevelFlashCard setLevelFlashCard={setLevelFlashCard}/></div>
     </div>
    </div>
  )
}

export default FlashCardPages
