const mongoose=require('mongoose');

const recipeSchema=new mongoose.Schema({
    dishname:{
        type: String,
        required: true
    },
    foodimage: String,
    category: String,
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
})

const recipeModel= mongoose.model("recipes_list",recipeSchema);
module.exports=recipeModel;