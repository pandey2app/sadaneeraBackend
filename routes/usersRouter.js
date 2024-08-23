import express from'express'
const router = express.Router();

import {getAllUsers, getAllUsersTesting, addUser, addUserToDB}  from'../controllers/usersController.js'

router.route('/').get(getAllUsers);
router.route('/add').get(addUser);
router.route('/add').post(addUserToDB);

router.route('/testing').get(getAllUsersTesting);

export default router;