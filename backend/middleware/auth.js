// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'No token provided or token format is invalid.' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = {
//             _id: decoded._id,       // User ID
//             username: decoded.name,
//              decoded// Username
//         };
//         next();
//     } catch (error) {
//         return res.status(401).json({ error: 'Invalid or expired token.' });
//     }
// };

// module.exports = authenticateUser;


const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    // Get the Authorization header (note lowercase 'authorization')
    const authHeader = req.headers['authorization'];

    // Ensure the Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided or token format is invalid.' });
    }

    // Extract the token part after 'Bearer '
    const token = authHeader.split(' ')[1];


    try {
        // Verify the token using your secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        req.user = { _id: decoded._id, username: decoded.name }; // Correctly decoded user info

        next();
    } catch (error) {
        console.log("Middleware error:", error);
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = authenticateUser;

