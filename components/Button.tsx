"use client"
import React from 'react'

const Button:React.FC<ButtonProps> = ({type, autofocus, disable, customClasses, onclick,children})=> {
  return (
    <div>
        <button
        type={type}
        autoFocus={autofocus}
        disabled={disable}
        className={`${customClasses} text-richblue-50 text-base bg-gradient-to-r  from-[#060e13] to-[#0c1b2e] px-3 py-2 hover:scale-95 transition duration-200 ease-linear rounded-lg font-mono` }
        onClick={()=>onclick()}
        >
        
            {children}
            
        </button>
    </div>
  )
}

export default Button



// types

type ButtonProps = {
    type: 'button' | 'submit' | 'reset',
    autofocus?: boolean,
    disable?:boolean,
    customClasses?: string,
    onclick:any,
    children: React.ReactNode
}