const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Post = require('./Post')

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  posts: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User
