const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user in tbl_user
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password — bcrypt for new users, MD5 for legacy users
let isMatch = false;
if (user.password.startsWith('$2')) {
  isMatch = await bcrypt.compare(password, user.password);
} else {
  const md5 = crypto.createHash('md5').update(password).digest('hex');
  isMatch = md5 === user.password;

  // Auto-upgrade MD5 to bcrypt on successful login
  if (isMatch) {
    const newHash = await bcrypt.hash(password, 10);
    await User.updatePassword(user.idx, newHash);
    console.log(`Password upgraded to bcrypt for user: ${user.username}`);
  }
}

if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.idx, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.idx,
        username: user.username,
        display_name: user.display_name,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };