import contactUsModel from "../models/contactUsModel.js";

const addContactForm = async (req, res) => {
    const { name, email, mobile, subject, message } = req.body;

    const newContactForm = await contactUsModel.create({ name, email, subject, mobile, message });
    res.json(newContactForm);
};

const getAllContactForms = async (req, res) => {
    
    const contactForms = await contactUsModel.find();
    res.json(contactForms);
};

const deleteContactForm = async (req, res) => {
    const { id } = req.params;

    const deletedContactForm = await contactUsModel.findOneAndDelete({ _id: id});
    res.json(deletedContactForm);
};

export {addContactForm, getAllContactForms, deleteContactForm}