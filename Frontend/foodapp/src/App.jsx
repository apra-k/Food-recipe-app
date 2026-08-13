import React from 'react'
import Home from './pages/Home'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import axios from 'axios'
import Recipeitems from './components/Recipeitems'
import Addrecipe from './pages/Addrecipe'
import Recipebyid from './pages/Recipebyid'

async function getAllRecipes(){
  
  const res=await axios.get('http://localhost:3000/recipe');
  const arr=res.data.recipes;
  return arr;
}



const App = () => {

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: getAllRecipes,
  },
  { 
    path:"/addrecipe", 
    element:<Addrecipe/>
  },
  {
    path:"/recipe/:id",
    element: <Recipebyid/>
  }]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App


//why we did res.data.recipe?
//the backend controller sent res.status(200).json({     recipes   }) which looks like 
// {
//     data: {
//         recipes: [...]
//     },
//     status: 200,
//     statusText: "OK",
//     headers: {...},
//     config: {...},
//     request: ...
// }
// but we only want recipes in data, recipes is an array of objects