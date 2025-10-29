import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {BookOpenText, Brain, Gamepad2, Phone, Rows3, WalletCards } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'

export function DashMenuToeicPartFive({user, streak}) {
  const navigate = useNavigate()
  const navigateToFlashCard = () => {
    navigate("/flashcardpage", { state: { user: user, streak:streak}})
    }
  const handelerBHome = () => {
    navigate("/homepage", { state: { user: user, streak:streak}})
  }
  return (
    <Sheet className="text-black">
      <SheetTrigger asChild>
        <Button variant="outline"> <Rows3 className='w-5 h-5' color="black" /> </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle> <div className='border-3 border-blue-500 rounded-4xl text-center w-35 h-10 text-black flex flex-row justify-center items-center'>TEST Options</div></SheetTitle>
          <SheetDescription>
            Switch
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <div className='flex flex-row text-black'>Options</div>
          </div>
          <div className="grid gap-3 border-2 border-black rounded-8xl rounded-lg p-5 flex flex-col">
            <div className="grid gap-3">
              <div className='flex flex-row text-black'>Reading Test</div>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-white "><BookOpenText className='w-5 h-5'/> Part 5 </Button>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-white"><BookOpenText className='w-5 h-5'/> Part 6 </Button>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-white"><BookOpenText className='w-5 h-5'/> Part 7 </Button>
            </div>
            <div className="grid gap-3">
              <div className='flex flex-row text-black'>Listenning Test</div>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-white"><BookOpenText className='w-5 h-5'/> Part 1 </Button>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-white"><BookOpenText className='w-5 h-5'/> Part 2 </Button>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-white "><BookOpenText className='w-5 h-5'/> Part 3 </Button>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-white"><BookOpenText className='w-5 h-5'/> Part 4 </Button>
            </div>
            {/* <Input id="sheet-demo-username" defaultValue="@peduarte" /> */}
          </div>
        </div>
        <SheetFooter>
          <Button onClick={()=>handelerBHome()}>BackToHome</Button>
          <SheetClose asChild className='mt-3'>
            {/* <Button variant="outline">Close</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

