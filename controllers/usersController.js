import userModel from "../models/userModel.js";

const getAllUsers = async (req, res) => {
    let { userCategory, mobile, email, name, isActive, sort, select, page, limit } = req.query;
    let queryObject = {};

    if(!req.query){
        console.log('No query')        
        const users = await userModel.find()
        res.status(200).json({users});
        return;
    }
    // Build the query object based on the filters
    if (userCategory) {
        queryObject.userCategory = { $regex: userCategory, $options: 'i' };
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if(mobile){
        queryObject.mobile = mobile;
    }
    if(email){
        queryObject.email = email;
    }
    if (isActive) {
        queryObject.isActive = isActive;
    }

    // Initialize the aggregation pipeline
    const pipeline = [];

    // Add the match stage to filter data based on the query object
    if (Object.keys(queryObject).length > 0) {
        pipeline.push({ $match: queryObject });
    }

    // Add the sort stage if sorting is specified
    if (sort) {
        let sortFields = sort.split(',').map(field => ({
            [field.startsWith('-') ? field.substring(1) : field]: field.startsWith('-') ? -1 : 1
        }));

        // Use $addFields to add lowercased fields for sorting
        sortFields.forEach(sortField => {
            const [key, order] = Object.entries(sortField)[0];
            pipeline.push({
                $addFields: {
                    [`sort_${key}`]: { $toLower: `$${key}` }
                }
            });
            pipeline.push({
                $sort: { [`sort_${key}`]: order }
            });
        });
    }

    // Add the projection stage if selecting specific fields
    if (select) {
        pipeline.push({ $project: select.split(',').reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) });
    }

    // Pagination logic
    if (page || limit) {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        pipeline.push({ $skip: skip }, { $limit: limit });
    }

    if(pipeline.length === 0) {
        pipeline.push({$match :{}});
    }else{
        console.log(pipeline)        
    }

    try {
        const users = await userModel.aggregate(pipeline);
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const getAllUsersTesting = async (req, res)=>{
    const users = await userModel.find()
    res.status(200).json({users});
}

//add user
const addUser = async (req, res)=>{
    res.render('addUser')
}

const addUserToDB = async (req, res)=>{
    console.log(req.body)
    try {
        const {name, email, image, mobile, birthDate, password, gender, state, district, role, userCategory, art, objective, isActive, createdAt, updatedAt} = req.body;
        const newUser = await userModel.create({name, email, image, mobile, birthDate, password, gender, state, district, role, userCategory, art, objective, isActive, createdAt, updatedAt});
        res.status(201).json({newUser});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error});
    }
   
}

//remove user
const removeUserFromDB = async (req, res)=>{
    const {id} = req.params;
    console.log(id);
    
    // const deletedUser = await userModel.findByIdAndDelete(_id);
    // res.status(201).json({deletedUser});
}

export {getAllUsers, getAllUsersTesting, addUser, addUserToDB, removeUserFromDB}