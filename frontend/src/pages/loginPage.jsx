import React, { useState } from 'react'
import Header from '@/components/LoginSignUpComponents/header.jsx'
import {LoginComponent, SignUpComponent } from '@/components/LoginSignUpComponents/loginSignUp.jsx'
import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showButton, setShowButton] = useState(true)
  return (
    <div className='min-h-screen grid grid-cols-3'>
      <aside className="col-span-1 bg-slate-100 flex justify-center  items-start pt-10">
      <div className="flex flex-col justify-center items-center space-y-4 bg-slate-50 p-5 rounded-2xl w-2/3 ">
        <Header/>
        <div className={`transition-all duration-500 ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex flex-row justify-center items-center space-x-2">
                <Button
                    size="lg"
                    className="px-6 text-black flex items-center gap-2"
                    onClick={() => {setShowLogin(!showLogin); setShowButton(!showButton)}}
                >
                <LogIn className="w-5 h-5" />
                    Login
                </Button>
                <Button
                    size="lg"
                    className="px-6 text-black flex items-center gap-2"
                    onClick={() => {setShowSignUp(!showSignUp); setShowButton(!showButton)}}
                >
                    <UserPlus className="w-5 h-5" />
                    SignUp
                </Button>
            </div>
        </div>
        <a>Wish you a wonderful day ^_-</a>
        <div className="mt-4 p-4 w-full  max-w-md">
        {showLogin && !showSignUp && <LoginComponent setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} setShowButton={setShowButton}/>}
        {showSignUp && !showLogin && <SignUpComponent setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} setShowButton={setShowButton}/>}
        </div>
      </div>
      </aside>
      <aside className="col-span-2 bg-slate-100">
      <div className='w-full h-full'>
        <img
          src="hello.jpg"
          alt="hello"
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>
      </aside>
    </div>
  )
}
export default LoginPage
