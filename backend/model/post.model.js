import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links each post to a user
      required: true,
    },
  },
  { timestamps: true } // auto add createdAt & updatedAt
);

const Post = mongoose.model("Post", postSchema);

export default Post;
