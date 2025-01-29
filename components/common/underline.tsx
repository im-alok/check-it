import React from 'react'

function underline({children}:{children : React.ReactNode}){
    return (
        <div className='relative'>
            <div className='absolute inset-x-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent'></div>
            <div className='absolute inset-x-0 bottom-0 h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent'></div>
            <div className='absolute inset-x-0 bottom-0 h-[4px] w-full mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm'></div>
            {children}
        </div>
    )
}

export default underline
