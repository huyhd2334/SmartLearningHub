import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { ChartArea } from 'lucide-react'

const ToHistPage = () => {
    const user = JSON.parse(localStorage.getItem("user"))?.accountName || "Guest"
    const langue = JSON.parse(localStorage.getItem("langue"))?.langue
    const navigate = useNavigate()
    const ToHistPage = () => {
        navigate("/history")
    }
  return (
    <div>
      <Button onClick={ToHistPage}> <ChartArea/> </Button>
    </div>
  )
}

export default ToHistPage
