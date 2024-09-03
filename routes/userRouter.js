import express from 'express';
import { addUserToDB, getUser, getUserByID, getUserTest, loginUser, logoutUser, removeUserFromDB } from '../controllers/userController.js';
const router = express.Router();

router.route('/').get(getUser);
router.route('/test').post(getUserTest);
router.route('/logout').get(logoutUser);
router.route('/:id').get(getUserByID);
router.route('/add').post(addUserToDB);
router.route('/login').post(loginUser);

router.route('/remove/:id').get(removeUserFromDB);

export default router;