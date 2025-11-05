import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import HomePageNews from '@/components/HomePageComponents/HomePageNews';
import NavigationHomePage from '@/components/HomePageComponents/NavigateHomPage'
import ShowStreak from '@/components/HomePageComponents/ShowStreak';
import TranslateTool from '@/components/TranslateTool';
import React, { useEffect } from 'react'
import { useNavigate, useLocation  } from 'react-router';
import { toast } from 'sonner';

const HomePage = () => {
  const location = useLocation()
  const streak = location.state?.streak ?? 0; 
  const user = location.state?.user || "Guest"; 
  const langue = location.state?.langue || "english"
  const navigate = useNavigate()
  useEffect(() => {
    if (user === "Guest") {
      navigate("/");
    }
    toast.success(`WellCome ${user} to ${langue}Home `)
  }, [user, navigate]);
  return (
    <div className='flex flex-col justify-center items-center min-h-screen translate-y-0 text-black font-semibold'>
      <NavigationHomePage user={user} streak={streak}/>
      <div className='absolute top-4 left-10'> <DashMenu/> </div>
      <div className='absolute top-24 left-120'><ShowStreak user={user} streak={streak}/></div>
      <div className='absolute top-50 left-30'><HomePageNews user={user} langue={langue}/></div>
      <div className='absolute top-27 left-220'><TranslateTool langue={langue}/></div>
    </div>
  )
}
export default HomePage
