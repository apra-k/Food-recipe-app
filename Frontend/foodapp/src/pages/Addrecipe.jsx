import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Addrecipe.css'
import { useNavigate } from 'react-router-dom';

const Addrecipe = () => {

  const navigate=useNavigate();
  const [recipedata,setrecipedata]=useState({
    dishname:"",
    category:"",
    ingredients:"",
    instructions:"",
    foodimage:null
  });

  async function submithandler(e){
    e.preventDefault();

    const formData=new FormData();
    formData.append('dishname',recipedata.dishname)
    formData.append("category", recipedata.category);
    formData.append("ingredients", recipedata.ingredients);
    formData.append("instructions", recipedata.instructions);
    formData.append("foodimage", recipedata.foodimage);

    try{
        const res=await axios.post('http://localhost:3000/recipe',formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }});
        // console.log(res.data)
        navigate('/')
    }catch(err){
        console.log(err);
    }
  }

  function changefunc(e){
    setrecipedata((prev)=>({              //prev->previous state object
        ...prev,                          //spreads old state so nothing is lost     
        [e.target.name]: e.target.type==='file'? e.target.files[0]:e.target.value    
    }))
  }

  return (
    <>
    <Navbar/>
    <div className='add-recipe-form'>
        <form onSubmit={submithandler}>
            <div className='form-row'>
                <label>Enter dish name:</label>
                <input type='text' required onChange={changefunc} value={recipedata.dishname} name='dishname'></input>
            </div>
            <div className='form-row'>
                <label>Enter category:</label>
                <input type='text' required onChange={changefunc} value={recipedata.category} name='category'></input>
            </div>
            <div className='form-row'>
                <label>Upload image:</label>
                <input type='file'  name="foodimage" accept="image/*" onChange={changefunc} ></input>    
                {/*  type="file" → Opens the file explorer., upload.single("foodimage") in backend and input name "foodimage" must be same (foodimage is same), accept="image/*" → Lets the user select only image files.  */ }
            </div>
            <div className='form-row'>
                <label>Enter ingredients:</label>
                <input type='text' required onChange={changefunc} value={recipedata.ingredients} name='ingredients'></input>
            </div>
            <div className='form-row'>
                <label>Enter instructions:</label>
                <textarea required onChange={changefunc} value={recipedata.instructions} name='instructions'></textarea>
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
    <Footer/>
    </>
  )
}

export default Addrecipe


