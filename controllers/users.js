const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

// @desc Register a user
// @route POST /api/users/register
// @access PUBLIC
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (user) return res.status(409).json({ msg: 'User already exists' });
  // creating new user instance
  const newUser = new User({
    name,
    email,
    password
  });

  // Hashing password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      newUser.password = hashedPassword;
      // Registering user here
      const user = await newUser.save();
      // generating and sending JWT token
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
};

// @desc Login user
// @route POST /api/users/login
// @access PUBLIC
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (!user) return res.status(409).json({ msg: 'User does not exists' });

  // validate password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return res.status(400).json({ msg: 'Invalid Credentials' });

  // login the user now
  jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
};

// @desc Get user
// @route GET /api/users/user
// @access PRIVATE
exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id).select('name email');
  return res.json({ id: user.id, name: user.name, email: user.email });
};
