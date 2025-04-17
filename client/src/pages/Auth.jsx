import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleLogin = async() =>{

    }

    const handleSignUp = async() =>{

    }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center mx-auto'>
        <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2" >
            <div className="mx-auto flex flex-col gap-10 items-center justify-center">
                <div className="mx-auto flex items-center justify-center flex-col">
                    <div className="mx-auto flex items-center justify-center">
                        <h1 className='text-5xl font-bold lg:text-6xl'>
                            Welcome
                        </h1>
                        <img className='h-[80px] mt-3' src='http://www.i2symbol.com/pictures/emojis/2/5/d/7/25d7afe627a6de5c89acfc91c7f1f3bf.png' alt='Victory emoji' />
                    </div>
                    <div className="text-sm font-semibold whitespace-nowrap">Fill in the details to experience the most amazing chat app!</div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Tabs className='w-full'>
                        <TabsList className='bg-transparent flex rounded-none w-full'>
                            <TabsTrigger className='data-[state=active]:bg-gray-200 text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-2 transition-all duration-300' value='login'>Login</TabsTrigger>
                            <TabsTrigger className=' data-[state=active]:bg-gray-200 text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-2 transition-all duration-300' value='signup'>Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent className='flex flex-col gap-4 mt-5' value='login'>
                            <Input placeholder="abc@gmail.com" type="email" className="rounded-full p-6" value={email} onChange = {(e) => setEmail(e.target.value)} />
                            <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange = {(e) => setPassword(e.target.value)} />
                            <Button className="rounded-full p-5 mt-1" onClick = {handleLogin}>Login</Button>
                        </TabsContent>
                        <TabsContent className='flex flex-col gap-4 mt-6' value='signup'>
                            <Input placeholder="abc@gmail.com" type="email" className="rounded-full p-5" value={email} onChange = {(e) => setEmail(e.target.value)} />
                            <Input placeholder="Password" type="password" className="rounded-full p-5" value={password} onChange = {(e) => setPassword(e.target.value)} />
                            <Input placeholder="Confirm Password" type="password" className="rounded-full p-5" value={confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} />
                            <Button className="mt-2 p-5 rounded-full" onClick = {handleSignUp}>Signup</Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center">
                <img src="https://wallpaperaccess.com/full/3404308.jpg" alt="background image" className='h-[530px] w-[400px] rounded-2xl' />
            </div>
        </div>
    </div>
  )
}
