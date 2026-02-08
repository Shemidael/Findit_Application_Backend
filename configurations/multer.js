import multer from "multer";

const storage = multer.memoryStorage();

const Upload = multer({ storage: storage });


export default Upload;
