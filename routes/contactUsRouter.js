import express from'express'
import { addContactForm, deleteContactForm, getAllContactForms } from '../controllers/contactUsController.js';
const router = express.Router();


router.route('/').get(getAllContactForms);
router.route('/add').post(addContactForm);
router.route('/delete/:id').get(deleteContactForm);


export default router;