const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

      if (!user)
        return res.status(400).send({ message: "Ops! Usuário não existe" });

      if (token !== user.passwordResetToken)
        return res.status(400).send({ message: "Ops! Token inválido" });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).send({ message: "Ops! O token expirou, tente gerar um novo!" });

      user.password = password;

      await user.save();

      return res.json({ message: "Senha alterada com sucesso!" });

    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }
}