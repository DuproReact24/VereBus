import React, { ReactNode } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function LayoutHome({children}:{ children: ReactNode }) {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
