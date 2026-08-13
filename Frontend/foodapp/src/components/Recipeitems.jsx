import React from 'react'
import { useLoaderData,useNavigate } from 'react-router-dom'
import '../styles/Recipeitems.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Recipeitems = (props) => {
  const navigate = useNavigate();

  
  return (
    <div className="card-container">
        {props.recipelist.map(function(elem,idx){
            return <div key={idx} className="card">
                <img src={`http://localhost:3000/images/${elem.foodimage}`}></img>

                <h3 className="card-title">{elem.dishname}</h3>


                <p className="card-category">{elem.category}</p>

                <FaEdit className='edit_icon' />
          <button className='viewrecipe' onClick={()=> navigate(`/recipe/${elem._id}`)}>View recipe </button>
          <MdDelete className='del_icon' />

                

            </div>

        })
        }
        
    </div>
  )
}

export default Recipeitems




