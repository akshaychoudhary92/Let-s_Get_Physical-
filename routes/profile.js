const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../models/Profile');
const User = require('../models/User');

//Get api/profile
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({user: req.user.id})
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No Profile Found';
        return res.errors(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
