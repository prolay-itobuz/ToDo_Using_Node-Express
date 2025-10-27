import express from 'express';
import multer from 'multer';
import ProfileController from '../controller/profileController.js';

const storage = multer.diskStorage({
  destination: './userUploads',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
const userProfile = new ProfileController();

router.post('/', userProfile.profile);

router.post('/upload', upload.single('DP'), userProfile.uploadPhoto);

export default router;
