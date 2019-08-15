const User = require('../../models/User');

module.exports = {
  async index(req, res) {
    const userLogged = await User.findOne({ _id: req.id });
    userLogged.password = undefined;
    return res.send(userLogged);
  }
};