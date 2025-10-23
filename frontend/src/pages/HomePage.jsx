import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import HomePageNews from '@/components/HomePageComponents/HomePageNews';
import NavigationHomePage from '@/components/HomePageComponents/NavigateHomPage'
import React, { useEffect } from 'react'
import { useNavigate, useLocation  } from 'react-router';
import { toast } from 'sonner';

const HomePage = () => {
  const location = useLocation()
  const user = location.state?.user || "Guest"; 
  const navigate = useNavigate()
  useEffect(() => {
    if (user === "Guest") {
      navigate("/");
    }
    toast.success(`WellCome ${user} to EnglishHome `)
  }, [user, navigate]);
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden"> 
    {/* Light Sky Blue Glow */}
    <div 
      className="absolute inset-0 z-0 pointer-events-none" 
      style={{
        backgroundImage: `
          radial-gradient(circle at center, #93c5fd, transparent)
        `,
      }} 
    />
    {/* Your Content Here */}
    <div className='flex flex-col justify-center items-center translate-y-[-00px] text-black font-semibold'>
      <NavigationHomePage user={user}/>
      <div className='absolute top-4 left-10'> <DashMenu/> </div>
      <div className='absolute top-50 left-20'><HomePageNews user={user}/></div>
    </div>
    </div>
  )
}
export default HomePage
