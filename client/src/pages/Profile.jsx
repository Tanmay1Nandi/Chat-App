import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from"react-icons/io5"
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { updateSuccess } from '../app/user/userSlice';
import {toggleTheme} from "../app/theme/themeSlice";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const filePickerRef = useRef();

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if(!imageFile){
      return;
    }
    uploadImage();
  }, [imageFile])

  useEffect(() => {
    setFormData({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      profilePicture: currentUser.profilePicture || ""
    });
  }, []);

  const uploadImage = async() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    try {
      const response = await fetch("/api/auth/upload", {
        method:"POST",
        body: formData,
      });
      const data = await response.json();
      if(response.ok){
        setLoading(false);
        setFormData(prev => ({ ...prev, profilePicture: data.data.url }));
        console.log(formData);
      }else{
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }

  const handleChanges = async(e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleSubmit = async() => {
    setErrorMessage(null);
    if(!formData.firstName){
      return setErrorMessage("First Name cannot be empty");
    }
    if(Object.keys(formData).length === 0){
      setErrorMessage("No changes made.");
      return;
    }
    console.log(formData);
    try {
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(formData)
      });
      if(response.ok){
        const data = await response.json();
        console.log(data);
        dispatch(updateSuccess(data));
        navigate("/chat");
      }else{
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="bg-pink-200 dark:bg-gray-900 h-[100vh] flex justify-center items-center flex-col gap-10">
        <div className="flex flex-col dark:bg-gray-900 bg-pink-200 gap-10 w-[80vw]  dark:border-gray-900  rounded-2xl p-5 sm:w-max">
          <div className="flex flex-row justify-between">
            <IoArrowBack className='text-4xl lg:text-6xl text-gray-600 dark:text-white/90  cursor-pointer' onClick={() => navigate("/auth")} />
            <div className="">
              <Button className="cursor-pointer rounded-full" onClick = {() => dispatch(toggleTheme())}>
                  {
                      theme === "light" ? <div className="">Dark</div> : <div>Light</div>
                  }
                </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:gap-10">
            <input type='file' accept='image/*' ref={filePickerRef} hidden onChange={handleImageChange}/>
            <div className="h-full w-32 md:w-48 md:h-48 relative border-2 border-purple-500 dark:border-gray-500 rounded-full flex items-center justify-center" onClick={() => filePickerRef.current.click()}>
              <img className='w-full h-full border-2 dark:border-gray-500 border-purple-500 rounded-full object-cover' src={imageFileURL || currentUser.profilePicture}/>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 md:gap-5">
              <Input className="bg-white"  value={currentUser.email} readOnly />
              <Input className="bg-white" placeholder="First Name" defaultValue={currentUser.firstName} id="firstName" onChange={handleChanges}/>
              <Input className="bg-white" placeholder="Last Name" defaultValue={currentUser.lastName} id="lastName" onChange={handleChanges}/>
            </div>
          </div>
          <Button disabled={loading} className="bg-gradient-to-r from-purple-500 dark:text-gray-300 to-pink-500 font-semibold cursor-pointer uppercase" onClick={handleSubmit}>Save Changes</Button>
          {
            loading && <div className="absolute mt-42 text-sm ml-6 lg:mt-65 lg:ml-15">UPLOADING</div>
          }
          
        </div>
          {
            errorMessage && <div className="flex justify-center items-center text-red-500">{errorMessage}</div>
          }
      </div>
    </div>
  )
}

