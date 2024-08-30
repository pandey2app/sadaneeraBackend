import express from'express'
const router = express.Router();

import {getAllUsers, getAllUsersTesting, addUser, addUserToDB, removeUserFromDB}  from'../controllers/usersController.js'

router.route('/').get(getAllUsers);
router.route('/add').get(addUser);
router.route('/add').post(addUserToDB);

router.route('/remove/:id').get(removeUserFromDB);


router.route('/testing').get(getAllUsersTesting);

export default router;