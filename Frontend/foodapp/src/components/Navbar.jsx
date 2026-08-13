import React, { useState } from 'react'
import '../styles/Navbar.css'
import Logindialog from './Logindialog';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate=useNavigate();

  const [isOpen, setisOpen]=useState(false);
  const token=localStorage.getItem("token")
  const useremail=JSON.parse(localStorage.getItem("useremail"))
  const [islogin,setislogin]=useState((token)? true:false)
  
  function loginhandle(){
    setisOpen(true);
  }

  function logouthandle(){
    localStorage.clear();
    setislogin(false)
    navigate('/');
  }

  function tohome(){
    navigate('/')
  }

  return (
    <><nav>
      <h1 className="logo">
        Recipe<span>Hub</span>
      </h1>
        <ul>
            <li onClick={tohome}>Home</li>
            <li>About</li>
            <li>Contact</li>
          

            {islogin ? (
            <>
            {/* {alert(`Logged in as ${useremail}`)} */}
              <li><span className="icon">👤</span><u> {useremail}</u></li>
              <li onClick={logouthandle} className='logoutbtn'>Logout</li>
              
            </>
            ) : (
              <li onClick={loginhandle}>Log in</li>
            )}

        </ul>
      </nav>
      
      {isOpen? <Logindialog setisOpen={setisOpen} setislogin={setislogin}/> : null}
    </>
  )
}

export default Navbar







