import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {Outlet, useLoaderData} from 'react-router-dom'
import Frontsection from '../components/Frontsection'
import Recipeitems from '../components/Recipeitems'




const Home = () => {

  const recipelist=useLoaderData();

  return (
    <>
      <Navbar/>
      <Frontsection/>
      <Recipeitems recipelist={recipelist}/>
      <Footer/>
        
    </>
  )
}

export default Home
