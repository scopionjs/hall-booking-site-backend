const User = require('../models/user');
const bcrypt = require('bcrypt');
//register a user
exports.register_user = async (req, res) => {
    const register_as = req.query.register_as;
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(req.query.password, saltRounds);

    let email_exist =await User.findOne({email: req.query.email})
    console.log(email_exist)
    if(!email_exist){
        const user = new User({
            username: req.query.username,
            password: hashedPassword,
            email: req.query.email,
            role: register_as
        });
        try {
            const savedUser = await user.save();
            res.json({savedUser});
        } catch (err) {
            res.status(400).json({err});
        }
    }else{
        res.status(400).json({err:{message:"user with that email already exist"}});
    }
}



//login a user
exports.login_user = async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    
    try {
        const user = await User.findOne({ email });
        console.log(email,password,user)
        if (!user) {
            
            res.status(401).json({ message: 'Email or password is incorrect' });

        }else{
            const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Email or password is incorrect' });
            
        }else{
            res.status(200).json({ message: 'Welcome ' + user.username ,data:user});
        }
        
        }
        
    } catch (err) {
        res.status(500).json(err.message);
    }
}
