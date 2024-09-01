import contactUsModel from "../models/contactUsModel.js";

const addContactForm = async (req, res) => {
    const { name, email, mobile, subject, message } = req.body;

    console.log(req.body);
    
    
    const newContactForm = await contactUsModel.create({ name, email, subject, mobile, message });
    console.log(newContactForm);
    res.json(newContactForm);
};

const getAllContactForms = async (req, res) => {
    const contactForms = await contactUsModel.find();
    res.json(contactForms);
};

export {addContactForm, getAllContactForms}