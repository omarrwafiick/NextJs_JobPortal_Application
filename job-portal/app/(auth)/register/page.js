'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/input';
import Password from '@/app/components/password';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',  
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      if(form.password!==password) {
        //toaster
        return;
      }
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(form),
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
      <Input name="name" onChange={handleChange} />
      <Input name="email" type="email" onChange={handleChange} />
      <Password name="password" onChange={handleChange} />
      <Password name="confirm password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="USER">Job Seeker</option>
        <option value="COMPANY">Company</option>
      </select>

      <button type="submit">Sign Up</button>
    </form>
  );
}
