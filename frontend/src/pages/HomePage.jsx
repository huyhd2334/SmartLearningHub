import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import HomePageNews from '@/components/HomePageComponents/HomePageNews';
import NavigationHome from '@/components/NavigateHomPage'
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
         className='flex flex-col justify-center items-center min-h-screen left-10 text-black font-semibold md:space-y-30 sm:space-y-20 px-4 inset-0'>
      <div className='absolute top-0 h-20 flex justify-center items-center border-2 border-gray-100 w-full bg-gray-50'><NavigationHome user={user} streak={streak} langue={langue}/></div>
      {announcement && (
        <div className='min-h-screen fixed inset-0 z-50 w-full h-full'>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="flex justify-center items-center z-40 translate-y-15"> <Announcement userName={user} streak={streak} langue={langue}/> </div>
        </div>
       )
      }
      <div className='absolute top-4 left-10'> <DashMenu/> </div>
      <div className='absolute top-28 left-[455px]'><ShowStreak user={user} streak={streak}/></div>
      <div className='absolute top-50 left-[190px] flex flex-col justify-center items-center space-y-10'><HomePageNews user={user} langue={langue}/> <Footer/> </div>
      <div className='absolute top-32 right-[555px]'><TranslateTool langue={langue}/></div>
      <div className='absolute top-4 right-10'> <ToHistPage user={user} streak={streak} langue={langue}/> </div>
    </div>
  )
}
export default HomePage
