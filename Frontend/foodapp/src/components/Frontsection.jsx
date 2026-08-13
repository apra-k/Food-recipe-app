import React from 'react'
import '../styles/Frontsection.css'
import Foodimage from '../assets/Foodimage.jpg'
import { useNavigate } from 'react-router-dom'

const Frontsection = () => {

  const navigate=useNavigate();

  function toaddrecipe(){
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please log in to add a recipe.");
        return;
    }   //only logged in users can post recipes
    navigate('/addrecipe')
  }

  return (
    <div className="banner">
      <div className="banner-text">
        <h1 className='tophead'>Welcome to Recipe Hub!</h1>
        <h2 className='subhead'>Delicious Recipes for Every Occasion</h2>
        <p className='para'>
          Find the perfect recipe for any meal! Explore easy dinners, healthy bites,
          and sweet delights to inspire your cooking.
        </p>
        <button onClick={toaddrecipe} className='addbtn'>Add Recipe</button>
      </div>
      
        <img src={Foodimage}/>
    
    </div>

  )
}

export default Frontsection


