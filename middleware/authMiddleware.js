const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No se proporcionó token. Inicie sesión.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido. Inicie sesión nuevamente.' });
    }
};

module.exports = auth;