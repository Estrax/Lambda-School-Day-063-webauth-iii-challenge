require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = {
    authenticated
};

async function authenticated(req, res, next){
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err){
                return res
                    .status(401)
                    .json({ message: 'Invalid credentials' });
            }else{
                req.decodedJwt = decodedToken;

                return next();
            }
        });
    }else{
        return res
            .status(401)
            .json({ message: 'You shall not pass!' });
    }
}