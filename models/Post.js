const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const PostSchema = Schema({
  imageURL: { type: String, required: true},
  taged_user: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  title: { type: String },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
      likes_on_comment: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
