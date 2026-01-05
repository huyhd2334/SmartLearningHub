import { SquareArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'

const BackButton = () => {
  const navigate = useNavigate()
  const handleBackHome = () => {
      navigate("/Homepage")
  }
  return (
    <div>
        <Button onClick={()=>{handleBackHome()}} className="w-12 h-10"><SquareArrowLeft/></Button>
    </div>
  )
}

export default BackButton
