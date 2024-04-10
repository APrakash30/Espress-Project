import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user_details_id: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    hashtags: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    no_of_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    no_of_comments: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
