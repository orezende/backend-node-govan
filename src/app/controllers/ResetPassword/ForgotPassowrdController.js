const crypto = require('crypto');

const User = require('../../models/User');
const mailer = require('../../../modules/Mailer');

module.exports = {
  async store(req, res) {
    const { email } = req.body;


    try {
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).send({ error: 'Usuário não encontrado' });

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findByIdAndUpdate(user._id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      });

      mailer.sendMail({
        to: email,
        from: 'joaorabello99@gmail.com',
        template : '/auth/forgot_password',
        context: { token },
      }, (err) => {
        if (err)
          return res.status(400).send({ error: "Ops! Não foi possivel enviar o e-mail" });

        res.json({status: 1, message: "E-mail enviado com suscesso"});
      });

    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }
}