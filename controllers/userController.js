const User = require("../models/user");

exports.signup = async (req, res,next) => {
    try{
        const {name,email,password} = req.body;

        // check if email already exists
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"});
        }

        const user = await User.create({name,email,password});
        return res.status(201).json({message:"User Created Successfully",user});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

