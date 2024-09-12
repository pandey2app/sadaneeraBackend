import express from 'express';
import { upload } from '../middlewares/multerMiddleware.js';
import { uploadImageFile } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', upload.single("image"), uploadImageFile )

export default router