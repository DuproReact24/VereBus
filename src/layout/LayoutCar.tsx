import React from 'react'
import Header from '../components/header/Header'

export default function LayoutCar({children}:any) {
  return (
   <>
   <Header/>
   <div className='mt-5'>
   {children}
   </div>

   </>
  )
}
