import { DashMenu } from '@/components/HomePageComponents/DashMenu';
import NavigationHomePage from '@/components/HomePageComponents/NavigateHomPage'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const HomePage = () => {
  const user = location.state?.user || "Guest"; 
  const navigate = useNavigate()
  useEffect(() => {
    if (user === "Guest") {
      navigate("/homepage");
    }
  }, [user, navigate]);
  return (
    <div className='flex flex-col justify-center items-center translate-y-[-00px] text-black font-semibold'>
      <NavigationHomePage user={user}/>
      <div className='absolute top-4 left-10'> <DashMenu/> </div>
    </div>
  )
}
export default HomePage
