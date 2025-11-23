import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { ChartArea } from 'lucide-react'

const ToHistPage = ({user, streak, langue}) => {
    const navigate = useNavigate()
    const ToHistPage = () => {
        navigate("/history", { state: { user: user, streak: streak, langue: langue}})
    }
  return (
    <div>
      <Button onClick={ToHistPage}> <ChartArea/> </Button>
    </div>
  )
}

export default ToHistPage
