const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

const upload = require("../../services/image-upload");

const singleUpload = upload.single("image");

//Post model
const Image = require("../../models/Image");

//Profile model
const Profile = require("../../models/Profile");
// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

// @route GET api/posts/
// @desc get posts
// @access Public

router.get("/", (req, res) => {
  Image.find()
    .sort({ date: -1 })
    .then(images => res.json(images))
    .catch(err =>
      res.status(404).json({ nopostfound: "No images found with the id" })
    );
});
// @route GET api/posts/:id
// @desc get posts by id
// @access Public

router.get("/:id", (req, res) => {
  Image.findById(req.params.id)
    .then(image => res.json(image))
    .catch(err =>
      res.status(404).json({ noimagefound: "No image found with the id" })
    );
});

//Validation

const validateImageInput = require("../../validation/image");

// @route POST api/posts
// @desc Create Post
// @access Private

router.post("/image-upload", function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err }]
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

// Image post

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateImageInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log(req.user);
    const newImage = new Image({
      text: req.body.text,
      imageUrl: req.body.imageUrl,

      user: req.user,
      name: req.user.name
    });
    newImage.save().then(image => res.json(image));
  }
);

// @route DELETE api/images/:id
// @desc Delete image
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(image => {
          //check for image owner
          if (image.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete
          image.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ imagenotfound: "No image found" })
        );
    });
  }
);

// @route Post api/posts/like/:id
// @desc  like post
// @access Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Image.findById(req.params.id)
        .then(image => {
          if (
            image.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alredyliked: "User alredy liked this image" });
          }

          //add user id to likes array
          image.likes.unshift({ user: req.user.id });
          image.save().then(image => res.json(image));
        })
        .catch(err =>
          res.status(404).json({ imagenotfound: "No image found" })
        );
    });
  }
);

// @route Post api/posts/unlike/:id
// @desc  unlike post
// @access Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Image.findById(req.params.id)
        .then(image => {
          if (
            image.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not liked this post yet" });
          }

          //get remove index
          const removeIndex = image.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          //splice out array
          image.likes.splice(removeIndex, 1);

          //save
          image.save().then(image => res.json(image));
        })
        .catch(err =>
          res.status(404).json({ imagenotfound: "No image found" })
        );
    });
  }
);

// @route image api/images/comment/:id
// @desc  add comment image
// @access Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    Image.findById(req.params.id)
      .then(image => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,

          user: req.user.id
        };
        //add to comments array
        image.comments.unshift(newComment);

        //save

        image.save().then(image => res.json(image));
      })
      .catch(err => res.status(404).json({ imagenotfound: "image not found" }));
  }
);

// @route Delete api/posts/comment/:id/:comment_id
// @desc remove comment from post
// @access Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Image.findById(req.params.id)
      .then(image => {
        //check to see if comment exists
        if (
          image.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }
        //get remove index
        const removeIndex = image.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //splice out of the array
        image.comments.splice(removeIndex, 1);
        image.save().then(image => res.json(image));
      })
      .catch(err => res.status(404).json({ imagenotfound: "image not found" }));
  }
);

module.exports = router;
