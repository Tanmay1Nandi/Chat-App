import React from 'react'
import { Button } from '../components/ui/button'
import {AiFillGoogleCircle} from "react-icons/ai"
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from '../firebase'
import { signInSuccess } from '../app/user/userSlice';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: "select_account"})
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const response = await fetch('/api/auth/google', {
                method: "POST",
                headers: {'Content-Type' : "application/json"},
                body: JSON.stringify({
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                })
            })
            const data = await response.json();
            if(response.ok){
                dispatch(signInSuccess(data));
                navigate("/profile");
            }

        } catch (error) {
            console.log(error)
        }
  }
  return (
    <Button onClick = {handleGoogleClick} className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"><span ><AiFillGoogleCircle /></span>Google</Button>
  )
}
