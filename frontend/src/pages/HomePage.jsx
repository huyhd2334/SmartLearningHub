import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import HomePageNews from '@/components/HomePageComponents/HomePageNews';
import NavigationHomePage from '@/components/NavigateHomPage'
import ShowStreak from '@/components/HomePageComponents/ShowStreak';
import TranslateTool from '@/components/TranslateTool';
import React, { useEffect } from 'react'
import { useNavigate, useLocation  } from 'react-router';
import { toast } from 'sonner';
import Footer from '@/components/HomePageComponents/Footer';

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
    <div className='flex flex-col justify-center items-center min-h-screen translate-y-0 text-black font-semibold md:space-y-30 sm:space-y-20 px-4 max-w-[1200px] mx-auto'>
      <NavigationHomePage user={user} streak={streak} langue={langue}/>
      <div className='absolute top-4 left-10'> <DashMenu/> </div>
      <div className='absolute top-24 left-85'><ShowStreak user={user} streak={streak}/></div>
      <div className='absolute top-50 left-15 flex flex-col justify-center items-center space-y-10'><HomePageNews user={user} langue={langue}/> <Footer/> </div>
      <div className='absolute top-27 left-200'><TranslateTool langue={langue}/></div>
    </div>
  )
}
export default HomePage
