"use client"
import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Preloader() {
  return (
    <div className=' w-screen h-screen flex justify-center items-center'>
        <ScaleLoader color='#aaa' speedMultiplier={3} loading={true} cssOverride= {{}}/>
    </div>
  )
}
