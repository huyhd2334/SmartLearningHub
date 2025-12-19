import HeaderHist from '@/components/ComponentsHist/HeaderHist';
import HistoryStatics from '@/components/ComponentsHist/HistoryStatics'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

const PageHist = () => {
  const location = useLocation()
  const streak = location.state?.streak ?? 0; 
  const user = location.state?.user || "Guest"; 
  const langue = location.state?.langue || "english"
  const navigate = useNavigate()
  useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
    }, [user, navigate]);
  return (
    <div className='flex flex-col space-y-5 '>
      <HeaderHist/>
      <div>
          <HistoryStatics user={user} streak={streak} langue={langue}/>
      </div>
    </div>
  )
}

export default PageHist
