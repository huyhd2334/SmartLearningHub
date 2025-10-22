import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import api from "@/lib/axios";
import { ArrowLeftFromLine, LogIn } from 'lucide-react'
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const LoginComponent = () => {
  const [accountName, setAccountName] = useState("")
  const [accountPassW, setAccountPassW] = useState("")
  const navigate = useNavigate()

  const HandleLogin = async () => {
    try {
      if (!accountName || !accountPassW) {
        return toast.error("accountName or accountPassW is empty")
      }
      const res = await api.post("/login", { accountName, passW: accountPassW })
      if (res.data.message) {
        toast.success("login successfull")
        navigate("/choselanguepage", { state: { user: accountName}})
        setAccountName("")
        setAccountPassW("")
      } else {
        toast.error("invalid accountName or passWord")
      }
    } catch (error) {
      console.error(error)
      toast.error("login went wrong!")
    }
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <Card className="p-4 border-0 bg-gradient-card shadow-custom-lg w-full max-w-xs">
        <Input
          type="text"
          placeholder="Your Account Name"
          value={accountName}
          onChange={(event) => setAccountName(event.target.value)}
          className="h-12 text-base bg-slate-50 w-full border-border/50"
        />
      </Card>
      <Card className="p-4 border-0 bg-gradient-card shadow-custom-lg w-full max-w-xs">
        <Input
          type="password"
          placeholder="Your Password"
          value={accountPassW}
          onChange={(event) => setAccountPassW(event.target.value)}
          className="h-12 text-base bg-slate-50 w-full border-border/50"
        />
      </Card>
      <div className='flex flex-row justify-center items-center gap-3'>
        <Button
          size="lg"
          className="px-6 text-black flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftFromLine className="w-5 h-5" />
          Back
        </Button>

        <Button
          size="lg"
          className="px-6 text-black flex items-center gap-2"
          onClick={HandleLogin}
        >
          <LogIn className="w-5 h-5" />
          Login
        </Button>
      </div>
    </div>
  )
}

export const SignUpComponent = () => {
  const [userName, setUserName] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accountPassW, setAccountPassW] = useState("")
  const navigate = useNavigate()

  const HandleLogin = async () => {
    try {
      if (!accountName || !accountPassW || !userName) {
        return toast.error("imformation is empty")
      }
      const res = await api.post("/signup", {userName, accountName, passW: accountPassW })
      if (res.data.message) {
        toast.success("signup successfull")
        setAccountName("")
        setAccountPassW("")
        navigate("/choselanguepage", { state: { user: accountName}})
      } else {
        toast.error("invalid accountName or passWord")
      }
    } catch (error) {
      console.error(error)
      toast.error("signup went wrong!")
    }
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <Card className="p-4 border-0 bg-gradient-card shadow-custom-lg w-full max-w-xs">
        <Input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          className="h-12 text-base bg-slate-50 w-full border-border/50"
        />
      </Card>
      <Card className="p-4 border-0 bg-gradient-card shadow-custom-lg w-full max-w-xs">
        <Input
          type="text"
          placeholder="Your Account Name"
          value={accountName}
          onChange={(event) => setAccountName(event.target.value)}
          className="h-12 text-base bg-slate-50 w-full border-border/50"
        />
      </Card>
      <Card className="p-4 border-0 bg-gradient-card shadow-custom-lg w-full max-w-xs">
        <Input
          type="password"
          placeholder="Your Password"
          value={accountPassW}
          onChange={(event) => setAccountPassW(event.target.value)}
          className="h-12 text-base bg-slate-50 w-full border-border/50"
        />
      </Card>
      <div className='flex flex-row justify-center items-center gap-3'>
        <Button
          size="lg"
          className="px-6 text-black flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftFromLine className="w-5 h-5" />
          Back
        </Button>

        <Button
          size="lg"
          className="px-6 text-black flex items-center gap-2"
          onClick={HandleLogin}
        >
          <LogIn className="w-5 h-5" />
          SignUp
        </Button>

      </div>
    </div>
  )
}
