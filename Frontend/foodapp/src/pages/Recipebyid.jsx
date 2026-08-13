import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Recipebyid.css'

const Recipebyid = () => {

    const [item,setitem]=useState(null)

    const {id} = useParams();

    async function getById(){
        const res=await axios.get(
            `http://localhost:3000/recipe/${id}`
        )   
        console.log(res.data.recipe);
        setitem(res.data.recipe);
    }

    useEffect(() => {
        getById();
    },[id]);
  
    if(!item){
        return <h2>Loading...</h2>;
    }

    return (<>
        <Navbar/>
        <div className="maindiv">
            <div className="imgdiv">
                <img src={`http://localhost:3000/images/${item.foodimage}`} alt={item.dishname} />
            </div >

            <div className="rightdiv">
            
                <h1>{item.dishname}</h1>

                <h2>{item.category}</h2>

                <h3>Ingredients</h3>
                <p>{item.ingredients}</p>

                <h3>Instructions</h3>
                <p>{item.instructions}</p>
            </div>
            
            

        </div>
        <Footer/>
        </>
    )
}

export default Recipebyid
