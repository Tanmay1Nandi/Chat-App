const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return next(errorHandler(401, 'Unauthorized'));
        }
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return next(errorHandler(401, 'Unauthorized'));
            }
            req.user = user;
            next();
            }
        );
    } catch (error) {
        next(error)
    }
}

module.exports = verifyUser;