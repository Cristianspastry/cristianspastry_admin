
"use client"



import React from 'react'
import NavBar from './navBar';
import { useRouter } from 'next/navigation';
import LoginPage from '@/app/login/page';
import { useAuth } from '@/components/AuthContext/authContext';
type Props = {
    children: React.ReactNode;
}

const LayoutProvider = (props: Props) => {
  const { isLoggedIn } = useAuth();
  return (
    <>
    {
        isLoggedIn ? (
            <>
            <NavBar/>
             {props.children}
            </>
        ) : (
        <div className='min-h-screen flex-1 items-center justify-center'>
        <LoginPage/>
        </div>
        )
    }
    
    </>
  )
}

export default LayoutProvider