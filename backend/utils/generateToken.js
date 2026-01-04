const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
        {id: user._id, email: user.email, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    return token;
};

module.exports = generateToken;