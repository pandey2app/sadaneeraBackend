import express from'express'
const router = express.Router();

import {getAllUsers, getAllUsersTesting, addUserToDB, removeUserFromDB, loginUser, getUser}  from'../controllers/usersController.js'

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);
router.route('/add').post(addUserToDB);
router.route('/login').post(loginUser);

router.route('/remove/:id').get(removeUserFromDB);


router.route('/testing').get(getAllUsersTesting);

export default router;