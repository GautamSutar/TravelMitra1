
const path = require('path');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



//otp generate 
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

// user signup
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: 'Password must be at least 9 characters long, contain at least one uppercase letter, one number, and one special character.',
            });
        }

        // Check if user with the same email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
        });

        // Save the user
        await newUser.save();

        // Email options for nodemailer
        const option = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        };

        console.log('option', option)

        const transporter = nodemailer.createTransport(option);

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Madhya Pradesh Travel Company</a>
                </div>
                <p style="font-size:1.1em">Hi ${name},</p> <!-- Dynamically include the user's name here -->
                <p>Thank you for registering with MP Tour and Travels Company. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br/>Madhya Pradesh Travel Company</p>
                <hr style="border:none;border-top:1px solid #eee"/>
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>MP Tour and Travel Company</p>
                    <p>Scheme No, 74 Vijay Nagar</p>
                    <p>Indore</p>
                </div>
            </div>
        </div>
`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'User registered successfully! OTP sent to your email.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user.' });
    }
};


// verification of otp
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });


        if (user.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }


        res.status(200).json({ message: 'OTP verified successfully! You can log in now.' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



//****************loginuser*******************

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Create a token with user ID and name
        const token = jwt.sign(
            { _id: user._id, name: user.name },   // Include both ID and username in the token
            process.env.JWT_SECRET,
            { expiresIn: '30d' }  // Token expires in 30 days
        );

        console.log(token);

        res.status(200).json({ message: 'Login successful!', token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Error logging in.' });
    }
};

//  *********** get all user ************** 

const allUser = async (req, res) => {
    try {
        const users = await User.find(); // Add 'await' to wait for the promise to resolve
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching the users" });
    }
};



module.exports = { registerUser, verifyOtp, loginUser, allUser };
