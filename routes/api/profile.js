const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

//Load validation
const validateProfileInput = require("../../validation/profile");

const router = express.Router();

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User Profile
const User = require("../../models/User");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile works" });
});

// @route GET api/profile
// @desc get current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/profile/all
// @desc Get all profiles
// @access public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There is no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json("There are no profiles"));
});

// @route GET api/profile/all by name
// @desc Get all profiles by name
// @access public

router.get("/all/name", (req, res) => {
  const errors = {};
  Profile.findOne({ name: req.body.user.name })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route POST api/profile
// @desc Create or edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.imageURL) profileFields.imageURL = req.body.imageURL;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.aboutMe) profileFields.aboutMe = req.body.aboutMe;
    if (req.body.donation) profileFields.donation = req.body.donation;

    //Skills - split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //Social
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.website) profileFields.social.website = req.body.website;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //upadate
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle alredy exists";
            res.status(400).json(errors);
          }

          //save profile

          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route GET api/profile/experience
// @desc add experience to profile
// @access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to exp array

      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route GET api/profile/education
// @desc add education to profile
// @access Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to exp array

      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile
// @access Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc delete education from profile
// @access Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice out of array
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/
// @desc delete user and profile
// @access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
