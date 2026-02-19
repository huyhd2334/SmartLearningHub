import TranslateTool from '@/components/TranslateTool';
import { DashMenuToeicPartFive } from '@/components/ToeicPartFiveComponents/DashMenuToeicPartFive';
import HeaderToeicPartFive from '@/components/ToeicPartFiveComponents/HeaderToeicPartFive.jsx'
import MainToeicPartFive from '@/components/ToeicPartFiveComponents/MainToeicPartFive';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';

const ToeicPartFivePage = () => {
    const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
    const langue = JSON.parse(localStorage.getItem("langue"))?.langue
    const streak = JSON.parse(localStorage.getItem("streak"))?.streak
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
    }, [user, navigate]);
  return (
    <div className='min-h-screen'>
    <div className='flex flex-col justify-center items-center translate-y-[30px] space-y-5'>
      <HeaderToeicPartFive user={user}/>
      <div className='absolute top-1 left-7'><DashMenuToeicPartFive user={user} streak={streak}/></div>
      <MainToeicPartFive user={user} streak={streak}/>
    </div>
    <div className='fixed bottom-115 right-230'><TranslateTool/></div>
  </div>
  )
}

export default ToeicPartFivePage
