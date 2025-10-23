import { DashMenuYourLib } from '@/components/YourLibComponents/DashMenuYourLib'
import HeaderYourLib from '@/components/YourLibComponents/HeaderYourLib'
import MainYourLib from '@/components/YourLibComponents/MainYourLib'
import { Award, ChartNoAxesCombined } from 'lucide-react'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

const YourLibPage = () => {
    const location = useLocation()
    const user = location.state?.user || "Guest"; 
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
      toast.success(`${user} library`)
    }, [user, navigate]);
  return (
    <div className='flex flex-col justify-center items-center text-black space-y-5 translate-y-[30px]'>
      <HeaderYourLib user={user}/>
      <MainYourLib user={user}/>
      <div className='absolute top-1 left-10'><DashMenuYourLib user={user}/></div>
      <div className='absolute top-1 left-300 flex flex-row space-x-5'><ChartNoAxesCombined className='w-7 h-7'/> <Award className='w-7 h-7'/> </div>
    </div>
  )
}

export default YourLibPage
