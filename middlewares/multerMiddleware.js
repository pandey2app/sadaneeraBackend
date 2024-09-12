// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//         cb(null, Math.floor(Math.random()*100)+file.originalname)
//     }
// })

// export const upload = multer({
//     storage,
// })

//code for servrless upload
import multer from "multer";

const storage = multer.memoryStorage(); 

export const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
});
