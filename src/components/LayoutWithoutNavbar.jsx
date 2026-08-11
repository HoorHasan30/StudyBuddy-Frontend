import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

function LayoutWithNavbar() {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default LayoutWithNavbar