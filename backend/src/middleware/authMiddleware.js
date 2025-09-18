const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('--- [authMiddleware] A verificar um novo pedido ---');
  console.log('[authMiddleware] Cabeçalho Authorization:', req.headers.authorization);
  console.log('[authMiddleware] Cookies recebidos:', req.cookies);
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('[authMiddleware] Token encontrado no CABEÇALHO.');
  } 
  else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
    console.log('[authMiddleware] Token encontrado nos COOKIES.');
  }

  if (!token) {
    console.log('[authMiddleware] Token encontrado nos COOKIES.');
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[authMiddleware] Token encontrado nos COOKIES.');
    req.usuario = decoded;
    next();
  } catch (error) {
    console.log('[authMiddleware] FALHA: O token é inválido.', error.message);
    res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;