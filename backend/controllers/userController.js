const getUserProfile = async (req, res) => {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  };
  
  module.exports = { getUserProfile };
  