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
    <div className="w-full h-screen min-h-screen flex">
      <div className="absolute top-6 left-6 flex flex-col justify-center items-center space-y-5 bg-slate-50 p-10">
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
        <div className="mt-4 p-4 w-full  max-w-md h-100">
        {showLogin && !showSignUp && <LoginComponent setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} setShowButton={setShowButton}/>}
        {showSignUp && !showLogin && <SignUpComponent setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} setShowButton={setShowButton}/>}
        </div>
      </div>
      <div className="absolute left-110 h-full">
        <img
          src="hello.jpg"
          alt="hello"
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>
    </div>
  )
}
export default LoginPage
