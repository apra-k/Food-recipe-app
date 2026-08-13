const recipeModel=require('../models/recipe.model');



const addrecipe=async(req,res)=>{

    try{
        const {dishname,category,ingredients,instructions}=req.body;
        const foodimage = req.file ? req.file.filename : null;   //if req.file exists, then only req.file.filename stored otherwise null, also if I made input of file to required, then here req.file.filename is enough, but i don't want the user to compulsarily upload an image of their food

        if(!dishname || !ingredients || !instructions){
            return res.status(400).json({
                message:"dishname, ingredients, recipe fields are required"
            })
        }
        
        const newrecipe=await recipeModel.create({
            dishname,category,ingredients,instructions,foodimage
        })
        return res.status(201).json({
            message: "Recipe added!",
            newrecipe
        })
    }catch(err){
        console.error("Error is",err)
        return res.status(500).json({
            message: err.message
        })
    }
    
}

const getAllRecipes=async(req,res)=>{
    try{
        const recipes=await recipeModel.find();
        res.status(200).json({
            recipes
        })
    }catch(err){      
        return res.status(500).json({
            message:err.message
        })
    }
}

const getRecipeById=async(req,res)=>{
    try{
        const recipe=await recipeModel.findById(req.params.id)
        if(!recipe){
            return res.status(400).json({
                message:"Recipe not found"
            })
        }
        res.status(200).json({
            recipe
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

const editRecipe=async(req,res)=>{        //u can select object by id and update any no.of fields, also u can only just pass the updated field in req.body, no need to pass all fields if u don't wanna change all)  
    try{
        const recipe=await recipeModel.findByIdAndUpdate({
        _id: req.params.id
        }, req.body, {new: true})         //1st arg finds the recipe by id, req.body or 2nd arg receives updated info, new:true is passed as 3rd arg so that the updated info is stored and not the original one.

        if(!recipe){                
            return res.status(400).json({
                message:"Recipe not found"
            })
        }
        return res.status(200).json({
            message: "Recipe updated",
            recipe
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }    
}

const deleteRecipe=async(req,res)=>{
    try{
        const recipe=await recipeModel.findByIdAndDelete({
            _id: req.params.id
        })

        if(!recipe){
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        return res.status(200).json({
            message: "Recipe deleted successfully"
        });
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports={addrecipe,getRecipeById,getAllRecipes,editRecipe,deleteRecipe} 



