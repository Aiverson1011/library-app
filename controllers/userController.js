const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signUp = async(req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).send("missing username or password");

    //hash password
    const passwordHash = await bcrypt.hash(password, 10);
    try{
        await User.create({username, passwordHash});
        //we can redirect here to dashboard or main page
        
        //res.redirect("/index")
        
        // this is for tem until above page is created
        return res.status(201).send("User Created");


    }catch(err){
        console.log("Signup error", err)
        return res.status(400).send("Unable to signup, check username and password")
    };
};

