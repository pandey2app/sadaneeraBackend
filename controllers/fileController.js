import { uploadToCloudinary } from "../utils/cloudinari.js";

const uploadImageFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file found.');
    }
    
    if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).send('Only image files are allowed.');
    }
    
    try {
        let cloudineryImage = '';

        if (req.file.path) {
            cloudineryImage = await uploadToCloudinary(req.file)
        }
        console.log(cloudineryImage);
        

        if (!cloudineryImage.secure_url) {
            return res.status(500).send({ message: 'Cloudinary upload failed' });
        }
        
        return res.status(201).json({ url: cloudineryImage.secure_url});
    } catch (error) {
        return res.status(500).json({"error": error });
    }

}
export { uploadImageFile }