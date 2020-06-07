const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const {check, validationResult} = require('express-validator')

const User = require('../models/User')

// @route       GET api/profile/:id
// @desc        get profile details
// @access      Private
router.get("/:id", auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id )
      if (!user) return res.status(404).json({ msg: "User not found" })
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route       POST api/profile/:id
// @desc        follow new profile
// @access      Private
router.post("/:id/follow", auth, async (req, res) => {
    try {
        const toFollow = await User.findById(req.params.id)
        const followBy = await User.findById(req.user.id)
        if (req.params.id !== req.user.id){
          await User.findByIdAndUpdate(req.user.id, { $push: { following: toFollow } })
          await User.findByIdAndUpdate(req.params.id, { $push: { followers: followBy } })
          res.json(await User.findById(req.params.id ));
        } else {
          res.json({"msg": "Unable to follow"})
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
})

// @route       POST api/profile/:id
// @desc        Unfollow profile
// @access      Private
router.post("/:id/unfollow", auth, async (req, res) => {
    try {
        const toUnFollow = await User.findById(req.params.id)
        const unFollowBy = await User.findById(req.user.id)
        await User.findByIdAndUpdate(req.user.id, { $pull: { following:{ _id: toUnFollow._id} } });
        await User.findByIdAndUpdate(req.params.id, { $pull: { followers: {_id: unFollowBy._id} } });
        res.json(await User.findById(req.params.id));
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
})



module.exports = router;