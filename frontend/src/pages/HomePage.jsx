import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import HomePageNews from '@/components/HomePageComponents/HomePageNews';
import NavigationHomePage from '@/components/HomePageComponents/NavigateHomPage'
import ShowStreak from '@/components/HomePageComponents/ShowStreak';
import React, { useEffect } from 'react'
import { useNavigate, useLocation  } from 'react-router';
import { toast } from 'sonner';

const HomePage = () => {
  const location = useLocation()
  const streak = location.state?.streak ?? 0; 
  const user = location.state?.user || "Guest"; 
  const navigate = useNavigate()
  useEffect(() => {
    if (user === "Guest") {
      navigate("/");
    }
    toast.success(`WellCome ${user} to EnglishHome `)
  }, [user, navigate]);
  return (
    <div className='flex flex-col justify-center items-center translate-y-[-00px] text-black font-semibold'>
      <NavigationHomePage user={user}/>
      <div className='absolute top-4 left-10'> <DashMenu/> </div>
      <div className='absolute top-30 left-100'><ShowStreak user={user} streak={streak}/></div>
      <div className='absolute top-50 left-30'><HomePageNews user={user}/></div>
    </div>
  )
}
export default HomePage
