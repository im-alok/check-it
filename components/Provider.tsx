"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="h-screen w-full bg-gradient-to-r from-black to-[#0c1725] relative ">


      {/* background */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_119px,#ffffff20_120px),linear-gradient(90deg,transparent_59px,#ffffff20_60px)]
  bg-[size:60px_120px] z-0"></div>

      <SessionProvider>
        <div className='relative z-10'>
          <Toaster />
          {children}
        </div>
      </SessionProvider>

    </div>
  )
}

export default Providers