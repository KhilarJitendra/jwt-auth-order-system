const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;


    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword, // TODO: Hash the password before saving it to the database
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const secretkey = "myVerySecretKey123!"
    // Generate JWT token
    const token = jwt.sign({ userId: user._id , email : user.email , phoneNumber : user.phoneNumber}, secretkey, {
      expiresIn: '1h', // Adjust the expiration time as needed
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = { registerUser , loginUser };
