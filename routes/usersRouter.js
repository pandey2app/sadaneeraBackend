import express from'express'
const router = express.Router();

import {getAllUsers, getAllUsersTesting}  from'../controllers/usersController.js'

router.route('/').get(getAllUsers);
router.route('/testing').get(getAllUsersTesting);

export default router;