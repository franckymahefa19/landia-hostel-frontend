import React from 'react'

const AuthLayout = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='w-full h-screen bg-slate-100 flex justify-center items-center'>{children}</div>
  )
}

export default AuthLayout