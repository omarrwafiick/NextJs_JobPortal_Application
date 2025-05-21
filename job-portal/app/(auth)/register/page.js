'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/input';
import Password from '@/app/components/password'; 

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [role, setRole] = useState(''); 
  const [password, setPassword] = useState('');  
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [resume, setResume] = useState(); 
  const [profile, setProfile] = useState(); 

  const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);  

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data.url;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      if(confirmPassword!==password) {
        //toaster
        return;
      }
      const resumeUrl = await uploadFile(resume, 'resume');
      const imageUrl = await uploadFile(profile, 'profile');

      const data = {
        name,
        email,
        password,
        role,
        resumeUrl,
        imageUrl
      };
      
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/login');
      } else {
         ////toaster      
      }
    } catch (error) {
      //toaster 
    }
  };

  return (
    <form onSubmit={registerUser}>
      <Input value={name} name="name" onChange={(e)=> setName(e.target.value)} />
      <Input value={email} name="email" type="email" onChange={(e)=> setEmail(e.target.value)} /> 
      <Input value={resume} name="resume" type="file" onChange={(e)=> setResume(e.target.files[0])} /> 
      <Input value={profile} name="profile" type="file" onChange={(e)=> setProfile(e.target.files[0])} /> 
      <Password value={password} name="password" onChange={(e)=> setPassword(e.target.value)} />
      <Password value={confirmPassword} name="confirm password" onChange={(e)=> setConfirmPassword(e.target.value)} />
      <select value={role} name="role" onChange={(e)=> setRole(e.target.value)}>
        <option value="USER">Job Seeker</option>
        <option value="COMPANY">Company</option>
      </select> 

      <button type="submit">Sign Up</button>
    </form>
  );
}
