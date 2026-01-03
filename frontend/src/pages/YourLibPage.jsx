import { DashMenuYourLib } from '@/components/YourLibComponents/DashMenuYourLib'
import HeaderYourLib from '@/components/YourLibComponents/HeaderYourLib'
import MainYourLib from '@/components/YourLibComponents/MainYourLib'
import { Award, ChartNoAxesCombined } from 'lucide-react'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

const YourLibPage = () => {
    const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
    const langue = JSON.parse(localStorage.getItem("langue"))?.langue
    const streak = JSON.parse(localStorage.getItem("streak"))?.streak
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
      toast.success(`${user} library`)
    }, [user, navigate]);
  return (
    <div className='flex flex-col justify-center items-center text-black space-y-5 translate-y-[30px] h-min-screen'>
      <HeaderYourLib user={user}/>
      <MainYourLib user={user} langue={langue}/>
      <div className='absolute top-1 left-10'><DashMenuYourLib user={user} streak={streak} langue={langue}/></div>
      <div className='absolute top-1 left-300 flex flex-row space-x-5'><ChartNoAxesCombined className='w-7 h-7'/> <Award className='w-7 h-7'/> </div>
    </div>
  )
}

export default YourLibPage
