import multer from "multer";
const upload = multer({
    storage:multer.memoryStorage(),
});
export default upload;
//REVIEW -  dont try to learn its syntax 