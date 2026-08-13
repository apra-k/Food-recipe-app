const express=require('express');
const app=express();
const router=require('./routes/recipe.routes')
const routerUser=require('./routes/user.routes')
const cors=require('cors')

app.use(express.json())
app.use(cors())
app.use('/images', express.static('./src/images'))    //images is the URL prefix (route)to access that file in browser, 2nd arg tells express to save that file in ./src/images 
app.use('/recipe',router)
app.use('/',routerUser)
module.exports=app; 