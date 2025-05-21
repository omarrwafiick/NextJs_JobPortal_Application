'use client';
import Input from '@/app/components/input';
import Password from '@/app/components/password';
import { GithubIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithCredentials = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard',
    });
  };

  const loginWithGitHub = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div>
      <form onSubmit={loginWithCredentials}>
        <Input type="email" onChange={e => setEmail(e.target.value)} name="Email" />
        <Password onChange={e => setPassword(e.target.value)} name={'password'}/>
        <button type="submit">Login</button>
      </form>

      <hr /> 

      <button onClick={loginWithGitHub}><GithubIcon /> Sign in with GitHub</button>
    </div>
  );
}
