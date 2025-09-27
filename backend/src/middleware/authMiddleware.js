const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    console.warn('Auth: token não fornecido. Cookies presentes:', !!req.cookies);
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error('Auth: falha ao verificar token:', error.message);
    // opcional: log do token (cuidado em produção)
    // console.debug('token:', token);
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;