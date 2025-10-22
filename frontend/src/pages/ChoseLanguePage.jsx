import HeaderChose from '@/components/ChosePageComponents/HeaderChose.jsx'
import ChoseLangue from '@/components/ChosePageComponents/MainChoseLangue.jsx'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';


const ChoseLanguePage = () => {
  const user = location.state?.user || "Guest"; 
  const navigate = useNavigate()
  useEffect(() => {
    if (user === "Guest") {
      navigate("/choselanguepage");
    }
  }, [user, navigate]);
  return (
  <div className="min-h-screen w-full bg-gray-900 relative">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, 
            rgba(34, 197, 94, 0.18) 0%, 
            rgba(15, 181, 76, 0.1) 25%, 
            rgba(34, 197, 94, 0.04) 35%, 
            transparent 50%
          )
        `,
        backgroundSize: "100% 100%",
      }}
    />
      <div className='flex flex-col justify-center items-center min-h-screen translate-y-[-50px] space-y-10'>
        <HeaderChose user={user}/>
        <ChoseLangue/>
      </div>
  </div>
  )
}
export default ChoseLanguePage