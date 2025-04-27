const User = require("../models/user.model");
const errorHandler = require("../utils/error");

const searchContacts = async(req, res, next) => {
    try {
        const {searchTerm} = req.body;

        if(!searchTerm){
            return next(errorHandler(400, "Search Term is required"))
        }

        const sanitizedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
                {_id: {$ne: req.userId}},
                {
                    $or: [{firstName: regex}, {lastName: regex}, {email: regex}]
                }
            ]
        });

        return res.status(200).json({contacts});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    searchContacts
}