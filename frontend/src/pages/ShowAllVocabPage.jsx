import ChoseAllVocab from '@/components/ShowAllVocabComponents/ChoseAllVocab'
import { DashMenuAllVocab } from '@/components/ShowAllVocabComponents/DashMenuAllVocab'
import HeaderAllVocab from '@/components/ShowAllVocabComponents/HeaderAllVocab'
import ShowAllVocab from '@/components/ShowAllVocabComponents/ShowAllVocab'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation  } from 'react-router';
import { toast } from 'sonner'

const ShowAllVocabPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataReady, setDataReady] = useState("")
    const location = useLocation()
    const user = location.state?.user || "Guest"; 
    const navigate = useNavigate()
    useEffect(() => {
      if (user === "Guest") {
        navigate("/");
      }
    }, [user, navigate]);
    useEffect(() => {
        if(dataReady) {
        toast.success(`Dữ liệu trang ${currentPage} cho ${user} đã sẵn sàng!`, { duration: 3000 })
        } else {
           toast.promise(`Dữ liệu trang ${currentPage} đang tải!`)
        }
    }, [dataReady, currentPage])

  return (
    <div className='flex flex-col justify-center items-center space-y-10 translate-y-[+20px]'>
      <HeaderAllVocab/>
      <ChoseAllVocab value={currentPage} setValue={setCurrentPage} />
      <ShowAllVocab value={currentPage} setDataReady={setDataReady}/>
      <ChoseAllVocab value={currentPage} setValue={setCurrentPage} />
      <div className='absolute top-4 left-10'><DashMenuAllVocab user={user}/></div>
    </div>
  )
}
export default ShowAllVocabPage
