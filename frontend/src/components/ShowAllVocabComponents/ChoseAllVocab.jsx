import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { StepBack, StepForward } from 'lucide-react'
import { toast } from 'sonner'

const ChoseAllVocab = ({ setValue, value, langue }) => {
  const [currentBlock, setCurrentBlock] = useState(1)
  const handleBackBlock = () => {
    if(currentBlock > 1){
        setCurrentBlock(currentBlock - 1)
        const newBlock = currentBlock - 1
        setValue(newBlock)
        console.log("Chuyển sang block:", newBlock)
    }else{
        toast.warning("Already on the first page")
    }
  }
  const handleNextBlock = () => {
    if(currentBlock < 100){
        setCurrentBlock(currentBlock + 1)
        const newBlock = currentBlock + 1
        setValue(newBlock)
    }else{
        toast.warning("Already on the last page")
    }
  }
    useEffect(() => {
       setCurrentBlock(value)
    }, [value])
  return (
    <div className="flex flex-col gap-3 border-2 border-black rounded-lg p-5 w-[320px] h-[70px]">
      <div className="flex flex-row justify-center items-center space-x-5">
        {langue === "english" ? (
          <>
            <Button onClick={handleBackBlock}>
              <StepBack className="w-5 h-5" /> Back
            </Button>
            <h1 className="text-black">Trang {currentBlock}</h1>
            <Button onClick={handleNextBlock}>
              <StepForward className="w-5 h-5" /> Next
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleBackBlock}
              className="bg-blue-400 text-white"
            >
              <StepBack className="w-5 h-5" /> Back
            </Button>
            <h1 className="text-black">Trang {currentBlock}</h1>
            <Button
              onClick={handleNextBlock}
              className="bg-blue-400 text-white"
            >
              <StepForward className="w-5 h-5" /> Next
            </Button>
          </>
        )}
      </div>
    </div>
  )}


export default ChoseAllVocab
