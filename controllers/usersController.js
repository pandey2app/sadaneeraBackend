import { mongo } from "mongoose";
import userModel from "../models/userModel.js";

const getAllUsers = async (req, res)=>{
    const {category : userCategory, name, isActive, sort, select, page, limit} = req.query;
    let queryObject = {};
    if(userCategory){
        queryObject.userCategory = { $regex: userCategory, $options: 'i'};
    } 
    if(name){
        queryObject.name = { $regex: name, $options: 'i'};
    }
    if(isActive){
        queryObject.isActive = isActive;
    }

    const mongoQuery = userModel.find(queryObject)

    if(sort){
        let fixedSort = sort.split(',').join(' ');
        mongoQuery.sort(fixedSort);
    }

    if(select){
        let fixedSelect = select.split(',').join(' ');
        mongoQuery.select(fixedSelect);
    }
    
    if(page || limit){
        page = page || 1
        limit = limit || 10;
        const startIndex = (page - 1) * limit;
        mongoQuery.skip(startIndex).limit(parseInt(limit));
    }
    const users = await mongoQuery
    res.status(200).json({users});
}
const getAllUsersTesting = async (req, res)=>{
    const users = await userModel.find()
    res.status(200).json({users});
}

export {getAllUsers, getAllUsersTesting}