import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import HomePageNews from '@/components/HomePageComponents/HomePageNews';
import NavigationHomePage from '@/components/NavigateHomPage'
import ShowStreak from '@/components/HomePageComponents/ShowStreak';
import TranslateTool from '@/components/TranslateTool';
import { useEffect, useState } from 'react'
import { useNavigate, useLocation  } from 'react-router';
import { toast } from 'sonner';
import Footer from '@/components/HomePageComponents/Footer';
import ToHistPage from '@/components/HomePageComponents/ToHistPage';
import Announcement from '@/components/Announcement';

const HomePage = () => {
  const location = useLocation()
  const streak = location.state?.streak ?? 0; 
  const user = location.state?.user || "Guest"; 
  const langue = location.state?.langue || "english"
  const [announcement, setAnnouncement] = useState(true)

  const navigate = useNavigate()
  useEffect(() => {
    if (user === "Guest") {
      navigate("/");
    }
    toast.success(`WellCome ${user} to ${langue}Home `)
  }, [user, navigate]);
  return (
    <div onClick={()=>{setAnnouncement(false)}}
         className='flex flex-col justify-center items-center min-h-screen translate-x-5 text-black font-semibold md:space-y-30 sm:space-y-20 px-4 inset-0'>
      <NavigationHomePage user={user} streak={streak} langue={langue}/>
      {announcement && (
        <div className='fixed inset-0 z-50 w-full h-full'>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="flex justify-center items-center z-40 translate-y-15"> <Announcement userName={user} streak={streak} langue={langue}/> </div>
        </div>
       )
      }
      <div className='absolute top-4 left-10'> <DashMenu/> </div>
      <div className='absolute top-24 left-85'><ShowStreak user={user} streak={streak}/></div>
      <div className='absolute top-50 left-35 flex flex-col justify-center items-center space-y-10'><HomePageNews user={user} langue={langue}/> <Footer/> </div>
      <div className='absolute top-27 left-200'><TranslateTool langue={langue}/></div>
      <div className='absolute top-4 left-300'> <ToHistPage user={user} streak={streak} langue={langue}/> </div>
    </div>
  )
}
export default HomePage
