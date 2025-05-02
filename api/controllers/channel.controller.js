
const Channel = require("../models/channel.model");
const errorHandler = require("../utils/error");

const createChannel = async (req, res, next) => {
  try {
    const { name, members } = req.body;

    if (!name || !members || members.length === 0) {
      return next(errorHandler(400, "Channel name and members are required"));
    }

    // include the creator as a member too
    const allMembers = [...new Set([...members, req.user.id])];

    const newChannel = await Channel.create({
      name,
      members: allMembers,
    });

    res.status(201).json({ channel: newChannel });
  } catch (err) {
    next(err);
  }
};


const searchContacts = async (req, res, next) => {
    try {
      const { searchTerm } = req.body;
  
      if (!searchTerm) {
        return next(errorHandler(400, "Search term is required"));
      }
  
      const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i");
  
      const contacts = await User.find({
        _id: { $ne: req.user.id },
        $or: [{ firstName: regex }, { lastName: regex }, { email: regex }]
      }, "firstName lastName email profilePicture");
  
      res.status(200).json({ contacts });
    } catch (err) {
      next(err);
    }
  };

module.exports = {
  createChannel,
  searchContacts
};
