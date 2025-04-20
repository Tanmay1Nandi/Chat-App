import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from"react-icons/io5"
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Profile() {
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

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
    console.log(imageFile),
    console.log(imageFileURL)
  }, [imageFile])

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
        console.log(data.data.url);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleChanges = async(e) => {
    e.preventDefault();
    
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
            <div className="h-full w-32 md:w-48 md:h-48 relative border-2 rounded-full bg-black-600 flex items-center justify-center" onClick={() => filePickerRef.current.click()} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              <img className='w-full h-full border-5 rounded-full object-cover' src={imageFileURL || currentUser.profilePicture}/>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 md:gap-5">
              <Input  value={currentUser.email} readOnly />
              <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 dark:text-gray-300 to-pink-500 font-semibold cursor-pointer uppercase" onClick={handleChanges}>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

