// const User = require("../models/User");
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');

// // Nodemailer setup (using Gmail)
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER, // This should point to your Gmail address
//         pass: process.env.EMAIL_PASS,  // This should point to your App Password
        
//     },
// });

// console.log('Using email:', process.env.EMAIL_USER);
// console.log('Using password:', process.env.EMAIL_PASS ? '********' : 'Not Set');


// // Forgot Password Controller
// const forgotPasswordController = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         const resetLink = `http://localhost:5000/reset-password/${resetToken}`; // Make sure to use correct port

//         // Send password reset email
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Password Reset Request',
//             text: `Click here to reset your password: ${resetLink}`,
//         });

//         res.json({ message: 'Password reset link sent to your email' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// // Reset Password Controller (Handling new and confirm password fields)
// const resetPasswordController = async (req, res) => {
//     const { token } = req.params;
//     const { newPassword, confirmPassword } = req.body;

//     // Validate that passwords match
//     if (newPassword !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.id;

//         // Hash new password
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(newPassword, salt);

//         // Update user with new password
//         await User.findByIdAndUpdate(userId, { password: hashedPassword });

//         res.json({ message: 'Password has been updated successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: 'Invalid or expired token' });
//     }
// };

// module.exports = {
//     forgotPasswordController,
//     resetPasswordController,
// };
