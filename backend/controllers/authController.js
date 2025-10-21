const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '2h'});
}

const registerUser = async (req, res) => {
    const {fullname, email, password, profileImageURL} = req.body;

    //Validation
    if(!fullname || !email || !password) {
        return res.status(400).json({message: "Please fill all the required fields"});
    }
    try {
        //Check if user exists
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: "User already exists for this emailId"});
        }

        //Create User
        const user = await User.create({fullname, email, password, profileImageURL});

        if(user) {
            return res.status(201).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                profileImageURL: user.profileImageURL,
                token: generateToken(user._id)
            });


        } else {
            return res.status(400).json({message: "Invalid user data"});
        }
    } catch(err) {
        return res.status(500).json({message: "Server error"});
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    //Validation
    if(!email || !password) {
        return res.status(400).json({message: "Please fill all the required fields"});
    }

    try {
        const user = await User.findOne({email});
        
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        res.status(200).json( {
              _id: user._id,
                email: user.email,
                token: generateToken(user._id)
        })
    } catch(err) {
        res 
            .status(500)
            .json({message: "Error registering user", error: err.message});
    }
}

const getUserInfo = async (req, res) => {

    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);
     } catch(err) {
        res 
            .status(500)
            .json({message: "Error registering user", error: err.message}); 
     }
    
};

module.exports = {
    registerUser,
    loginUser,
    getUserInfo
};
