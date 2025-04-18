import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {Loader2} from "lucide-react"
import OAuth from '../myComponents/OAuth';
import { toggleTheme } from '../app/theme/themeSlice';
import { signInSuccess } from '../app/user/userSlice';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {theme} = useSelector(state => state.theme);

    const handleLogin = async(e) =>{
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        if(email === "" || password ===""){
            setLoading(false);
            setErrorMessage("All fields are required for login.");
            return;
        }
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers:{"Content-type" : "application/json"},
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if(response.ok){
                setLoading(false);
                dispatch(signInSuccess(data));
                navigate("/profile");
            }
            else{
                setLoading(false);
                setErrorMessage(data.message);
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
        }
    }

    const handleSignUp = async(e) =>{
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        if(email === "" || password === "" || confirmPassword === ""){
            setLoading(false);
            return setErrorMessage("Please fill all the fields for signup.");
        }
        if(password !== confirmPassword){
            setLoading(false);
            return setErrorMessage("Password and Confirm Password should match");
        }
        try {
            const response = await fetch("/api/auth/signup",{
                method: "POST",
                headers:{"Content-type" : "application/json"},
                body: JSON.stringify({
                    email,
                    password
                }),
            })
            const data = await response.json();
            if(data.success === false){
                setLoading(false);
                return setErrorMessage(data.message);
            }else{
                setLoading(false);
                setSuccessMessage("Signup successful please login now");
                navigate("/auth");
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
        }
    }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center mx-auto'>
        <div className="absolute mb-150 xl:ml-200 ml-75">
            <Button className="cursor-pointer rounded-full" onClick = {() => dispatch(toggleTheme())}>
                {
                    theme === "light" ? <div className="">Dark</div> : <div>Light</div>
                }
            </Button>
        </div>
        <div className="h-[80vh] dark:bg-gray-600 dark:border-black bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 " >
            <div className="mx-auto flex flex-col gap-10 items-center justify-center">
                <div className="mx-auto flex items-center justify-center flex-col">
                    <div className="mx-auto flex items-center justify-center">
                        <h1 className='text-5xl font-bold lg:text-6xl dark:text-black'>
                            Welcome
                        </h1>
                        <img className='h-[80px] mt-3' src='http://www.i2symbol.com/pictures/emojis/2/5/d/7/25d7afe627a6de5c89acfc91c7f1f3bf.png' alt='Victory emoji' />
                    </div>
                    <div className="text-sm font-semibold whitespace-nowrap dark:text-black">Fill in the details to experience the most amazing chat app!</div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Tabs className='w-full'>
                        <TabsList className='bg-transparent flex rounded-none w-full'>
                            <TabsTrigger className='data-[state=active]:bg-gray-200 dark:bg-gray-700 data-[state=active]:dark:bg-gray-800 dark:text-gray-200 text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-2 transition-all duration-300' value='login' onClick={() => {setErrorMessage(null)}}>Login</TabsTrigger>
                            <TabsTrigger className=' data-[state=active]:bg-gray-200 data-[state=active]:dark:bg-gray-800 dark:bg-gray-700 dark:text-gray-200  text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-2 transition-all duration-300' value='signup' onClick={() => {setErrorMessage(null)}}>Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent className='flex flex-col gap-4 mt-5' value='login'>
                            <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange = {(e) => setEmail(e.target.value)} />
                            <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange = {(e) => setPassword(e.target.value)} />
                            <Button disabled={loading} className="rounded-full p-5 mt-1 cursor-pointer dark:bg-gray-800 dark:text-gray-200" onClick = {handleLogin}>
                                {
                                    loading === true ? (<>
                                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                            <span>Loading ...</span>
                                        </>) :
                                    <div>Login</div>
                                }
                                
                            </Button>
                            <OAuth />
                        </TabsContent>
                        <TabsContent className='flex flex-col gap-4 mt-6' value='signup'>
                            <Input placeholder="Email" type="email" className="rounded-full p-5" value={email} onChange = {(e) => setEmail(e.target.value)} />
                            <Input placeholder="Password" type="password" className="rounded-full p-5" value={password} onChange = {(e) => setPassword(e.target.value)} />
                            <Input placeholder="Confirm Password" type="password" className="rounded-full p-5" value={confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} />
                            <Button disabled={loading} className="mt-2 p-5 rounded-full cursor-pointer dark:bg-gray-800 dark:text-gray-200" onClick = {handleSignUp}>
                            {
                                    loading === true ? (<>
                                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                            <span>Loading ...</span>
                                        </>) :
                                    <div>Signup</div>
                                }
                            </Button>
                            <OAuth />
                        </TabsContent>
                    </Tabs>
                </div>
                {
                    errorMessage && <div className="max-w-[350px] truncate text-red-500">{errorMessage}</div>
                }
                {
                    successMessage && <div className="max-w-[350px] truncate text-green-600">{successMessage}</div>
                }
            </div>
            <div className="hidden xl:flex justify-center items-center">
                <img src="https://wallpaperaccess.com/full/3404308.jpg" alt="background image" className='shadow-2xl h-[530px] w-[410px] rounded-2xl' />
            </div>
        </div>
    </div>
  )
}
