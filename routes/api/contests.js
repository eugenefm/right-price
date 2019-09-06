const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Pick = require('../../models/Pick');
const Contest = require('../../models/Contest');

// @route   POST api/contests
// @desc    Create a contest
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Contest name is required')
        .not()
        .isEmpty(),
      check('ticker', 'You must provide a valid stock ticker.')
        .not()
        .isEmpty(),
      check('startDate', 'Contest start date must be after today.').isAfter(new Date().toDateString()),
      check('endDate').custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startDate)) {
          throw new Error('End date of contest must be valid and after start date.');
        }
        return true;
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, ticker, startDate, endDate, password } = req.body;
      const newContest = new Contest({
        name,
        ticker,
        startDate,
        endDate,
        admin: req.user.id
      });
      if (password) {
        const salt = await bcrypt.genSalt(10);

        newContest.password = await bcrypt.hash(password, salt);
        newContest.private = true;
      }
      const contest = await newContest.save();
      res.json(contest);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
