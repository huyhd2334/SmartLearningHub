import HeaderHist from '@/components/HistComponents/HeaderHist';
import HistoryStatics from '@/components/HistComponents/HistoryStatics'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

const PageHist = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
  const langue = JSON.parse(localStorage.getItem("langue"))?.langue
  const streak = JSON.parse(localStorage.getItem("streak"))?.streak
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
