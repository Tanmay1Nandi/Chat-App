import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from"react-icons/io5"
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { updateSuccess } from '../app/user/userSlice';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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
    const formData = new FormData();
    formData.append("file", imageFile);
    try {
      const response = await fetch("/api/auth/upload", {
        method:"POST",
        body: formData,
      });
      const data = await response.json();
      if(response.ok){
        setFormData(prev => ({ ...prev, profilePicture: data.data.url }));
        console.log(formData);
      }
    } catch (error) {
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
      <div className="bg-[#1b1c4] h-[100vh] flex justify-center items-center flex-col gap-10">
        <div className="flex flex-col gap-10 w-[80vw] sm:w-max">
          <div className="">
            <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
          </div>
          <div className="grid grid-cols-2 md:gap-10">
            <input type='file' accept='image/*' ref={filePickerRef} hidden onChange={handleImageChange}/>
            <div className="h-full w-32 md:w-48 md:h-48 relative border-2 rounded-full bg-black-600 flex items-center justify-center" onClick={() => filePickerRef.current.click()}>
              <img className='w-full h-full border-5 rounded-full object-cover' src={imageFileURL || currentUser.profilePicture}/>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 md:gap-5">
              <Input  value={currentUser.email} readOnly />
              <Input placeholder="First Name" defaultValue={currentUser.firstName} id="firstName" onChange={handleChanges}/>
              <Input placeholder="Last Name" defaultValue={currentUser.lastName} id="lastName" onChange={handleChanges}/>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 dark:text-gray-300 to-pink-500 font-semibold cursor-pointer uppercase" onClick={handleSubmit}>Save Changes</Button>
          
        </div>
          {
            errorMessage && <div className="flex justify-center items-center text-red-500">{errorMessage}</div>
          }
      </div>
    </div>
  )
}

