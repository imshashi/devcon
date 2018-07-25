const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validations/register');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Users works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',   // Size
          r: 'pg',    // Rating
          d: 'mm'     // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar, // or avatar: avatar
          password: req.body.password
        });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if(error) throw error;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(error => console.log(error));
          });
        });
      }
    });
});

// @route   GET api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(400).json({ email: 'User not found' });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched

            // Create jwt payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }

            // Sign Token
            jwt.sign(
              payload,
              keys.secretKey,
              { expiresIn: 3600 },
              (error, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            );
          } else {
            return res.status(400).json({ password: 'Password incorrect' })
          }
        })
    })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  }
)

module.exports = router;
