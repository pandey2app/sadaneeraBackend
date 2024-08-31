import contactUsModel from "../models/contactUsModel.js";

const addContactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;
    const newContactForm = await contactUsModel.create({ name, email, phone, message });
    res.json(newContactForm);
};

const getAllContactForms = async (req, res) => {
    const contactForms = await contactUsModel.find();
    res.json(contactForms);
};

export {addContactForm, getAllContactForms}