const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    res.send(401).send({ error: 'Token não informado' });

  const parts = authHeader.split(' ');

  if (!parts.lenght === 2)
    res.send(401).send({ error: 'Token no formato inválido' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token mal formatado' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: 'Token inválido' });

    req.id = decoded.id;

    return next();
  });
};