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
import {Brain, Gamepad2, Rows3, WalletCards } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'

export function DashMenuFlashCard({user}) {
  const navigate = useNavigate()
  const navigateToFlashCard = () => {
    navigate("/flashcardpage", { state: { user: user}})
    }
  const handelerBHome = () => {
    navigate("/homepage", { state: { user: user}})
  }
  return (
    <Sheet className="text-black">
      <SheetTrigger asChild>
        <Button variant="outline"> <Rows3 className='w-5 h-5' color="black" /> </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Learn Vocab Options</SheetTitle>
          <SheetDescription>
            Switch
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <div className='flex flex-row text-black'>Options</div>
          </div>
          <div className="grid gap-3 border-2 border-black rounded-8xl rounded-lg p-5 flex flex-col">
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-black"onClick={()=>navigateToFlashCard()}><WalletCards className='w-5 h-5'/> Flash Card</Button>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-black"><Gamepad2 className='w-5 h-5'/> Game</Button>
            </div>
            <div className='flex flex-row space-x-2 text-black'>
              <Button size="xl" className="w-60 h-7 text-black"><Brain className='w-5 h-5'/> Practice</Button>
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

