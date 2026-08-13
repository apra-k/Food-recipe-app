const express=require('express');
const { addrecipe, getRecipeById, getAllRecipes, editRecipe, deleteRecipe} = require('../controllers/recipe.controllers');
const upload=require('../middleware/upload')
const verifyToken=require('../middleware/tokenverify')
const router=express.Router();

router.post('/',verifyToken,upload.single('foodimage'),addrecipe);   //foodimage is field name and single means one image file
router.get('/',getAllRecipes);
router.get('/:id',getRecipeById);
router.put('/:id',verifyToken,editRecipe)
router.delete('/:id',verifyToken,deleteRecipe)

module.exports=router;

