const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    res.send(401).send({ error: 'No token provided' });
    
  const parts = authHeader.split(' ');

  if (!parts.lenght === 2)
    res.send(401).send({ error: 'Invalid format token' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: 'Token inválido' });
    
    req.id = decoded.id;

    return next();
  });
};