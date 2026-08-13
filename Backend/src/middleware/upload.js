const multer=require('multer')
const path=require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {   
    cb(null, path.join(__dirname,'../images'))    //__dirname → the folder where upload.js lives. and path.join → safely combines them into a full path, so total it becomes till Backend/src/images  
  },
  filename: function (req, file, cb) {

    const ext=path.extname(file.originalname); // .jpg, .png, etc.
    const baseName=path.basename(file.originalname, ext); // original name without extension
    const filename=Date.now()+'-'+ baseName+ext;
    cb(null, filename);

  }
})

const upload = multer({ storage: storage })

module.exports=upload;

//



// destination function to decide where the uploaded file will be stored, three params, req object of express,file object, cb is callback function,(how u tell multer the result) syntax is cb(error, value), filename function to decide name of file, store storage in upload variable, then export it