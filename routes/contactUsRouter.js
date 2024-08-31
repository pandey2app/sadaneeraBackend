import express from'express'
import { addContactForm, getAllContactForms } from '../controllers/contactUsController.js';
const router = express.Router();


router.route('/').get(getAllContactForms);
router.route('/add').post(addContactForm);


export default router;