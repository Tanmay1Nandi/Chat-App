const cloudinary = require("cloudinary").v2;

const getSignedUrl = (req, res) => {
    const { publicId, fileType } = req.body;
  
    if (!publicId || !fileType) {
      return res.status(400).json({ error: "Missing data" });
    }
  
    const signedUrl = cloudinary.utils.private_download_url(
      publicId, 
      fileType, 
      { type: "authenticated", expires_at: Math.floor(Date.now() / 1000) + 300 } // valid for 5 mins
    );
  
    res.json({ url: signedUrl });
  };

  module.exports = {
    getSignedUrl
  }