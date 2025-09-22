const jwt = require('jsonwebtoken');

const optionalAuthMiddleware = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
    } catch (error) {
      console.log('Middleware opcional: Token inválido, a continuar como convidado.');
    }
  }
  next();
};

module.exports = optionalAuthMiddleware;