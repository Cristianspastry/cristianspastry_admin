

import { useForm } from 'react-hook-form';

import React from 'react'
import { useAuth } from '@/components/AuthContext/authContext';
import { LoginCredentials } from '@/utils/const';
type Props = {}

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
   const {login} = useAuth();

  const onSubmit = (data : any,e : any) => {
    e.preventDefault();
    // Esegui azioni di autenticazione con i dati del modulo
    if (data.email === LoginCredentials.email && data.password === LoginCredentials.password) {
      // Autenticazione riuscita, imposta la variabile di sessione o reindirizza alla dashboard appropriata
    console.log(data);
    login();
  } else {
    // Autenticazione fallita, visualizza un messaggio di errore
      alert('Email o password errati, riprova!');
  }
}
  return (
    <>
     <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input id="email-address"  type="email" autoComplete="email" required {...register("email")} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{"errors.email.message"}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password"  type="password" autoComplete="current-password" required {...register("password")} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{"errors.password.message"}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">password dimenticata?</a>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 5.586V4a1 1 0 011-1zM4 8.5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM5 13.5a1 1 0 100 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
                </svg>
              </span>
              Accedi
            </button>
          </div>
        </form>
    </>
  )
}   



export default LoginForm;