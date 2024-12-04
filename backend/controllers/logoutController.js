let tokenBlacklist = [];

const logoutUser = (req, res) => {
    const token = req.token;

    // Add the token to the blacklist to invalidate it
    tokenBlacklist.push(token);

    res.status(200).json({ message: 'Logged out successfully.' });
};

// Middleware to check if a token is blacklisted
const checkBlacklist = (req, res, next) => {
    const token = req.token;

    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'This token has been invalidated (blacklisted).' });
    }
    next();
};

module.exports = { logoutUser, checkBlacklist };