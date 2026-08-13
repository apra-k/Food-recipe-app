import React, { useState } from 'react'
import '../styles/Logindialog.css'
import axios from 'axios'

const Logindialog = ({setisOpen,setislogin}) => {

    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");

    const[issignup,setissignup]=useState(false);
    const [error,seterror]=useState("");

    async function submitHandler(e){
        try{
            e.preventDefault();
            const url= issignup? "http://localhost:3000/signup":"http://localhost:3000/signin"
            const res=await axios.post(url,{
                email, password  
            })
            setislogin(true)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("useremail",JSON.stringify(email))
            setisOpen(false)
        }catch(err){
            // seterror(error.response.data.message)
            seterror(err.response?.data?.message || "Something went wrong"); 
        }
    }

    return (
    <>
        <div className="modal-overlay">
            <div className="modal">
                {issignup? <h3>Sign Up</h3>:<h3>Sign In</h3>}
                <button className='closebtn' onClick={()=>{setisOpen(false)}}>X</button><br/>
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Email </label>
                        <input type='email' onChange={(e)=>{setemail(e.target.value)}} value={email} required></input>
                    </div>
                    <div>
                        <label>Password </label>
                        <input type='password' onChange={(e)=>{setpassword(e.target.value)}} value={password} required></input>
                    </div>
                    <div>
                        <button type='submit' className='loginbtn'>
                            {(issignup)? "Sign up and login": "Login"}
                        </button>
                        <p className="error">{error}
                        </p>
                    </div>
                    
            
                    {(!issignup)? <p>
                        Don't have an account? <span onClick={()=>{setissignup(true)}} className='signupbtn'>Sign Up</span> 
                    </p>: null}
                    
                </form>
            </div>
        </div>
    </>
   )
}

export default Logindialog

