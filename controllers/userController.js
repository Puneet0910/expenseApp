const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.signup = async (req, res,next) => {
    try{
        const {name,email,password} = req.body;

        // check if email already exists
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({name,email,password:hashedPassword});
        return res.status(201).json({message:"User Created Successfully",user});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

exports.login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        return res.status(200).json({ success: true, message: 'Login successful', user });
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
};