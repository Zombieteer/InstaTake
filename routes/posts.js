// CRUD
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// search for express validator over internet
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Post = require("../models/Post");
// const Contact = require('../models/Contact')

// @route       GET api/post
// @desc        Get all user post
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id )
    const posts = await user.posts
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/post
// @desc        ADD new post
// @access      Private
router.post("/",[auth, [check("imageURL", "Image is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imageURL, title } = req.body;
    try {
      const posts = new Post({ imageURL, title });
      await User.findByIdAndUpdate(req.user.id, { $push: { posts } });
      res.json(await User.findById(req.user.id));
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// // @route       PUT api/contacts/:id
// // @desc        Update contact
// // @access      Private
// router.put('/:id', auth, async (req, res) => {
//     const { name, email, phone, type } = req.body;

//     // Build contact object
//     const contactFields = {};
//     if (name) contactFields.name = name;
//     if (email) contactFields.email = email;
//     if (phone) contactFields.phone = phone;
//     if (type) contactFields.type = type;

//     try {
//         let contact = await Contact.findById(req.params.id);

//         if (!contact) return res.status(404).json({ msg: "Contact not found" })

//         // Make sure user owns contacts
//         if (contact.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: "Not Authorized" })
//         }

//         contact = await Contact.findByIdAndUpdate(req.params.id,
//             { $set: contactFields },
//             { new: true })

//         res.json(contact);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// @route       DELETE api/posts/:id
// @desc        Delete post
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        var user = await User.findById(req.user.id )
        var posts = user.posts
        posts = posts.filter(post => post._id.toString() !== req.params.id);
        user = await User.findByIdAndUpdate(req.user.id, { posts });
        res.json(await User.findById(req.user.id ));
        // res.json({ msg: "Post Removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
