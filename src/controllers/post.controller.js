import userModel from "../models/user.model.js";
import postModel from "../models/post.model.js";

export const addPost = async (req, res) => {
  try {
    const { caption, hashtags, image, user_details_id } = req.body;

    const isUser = await userModel.findById(user_details_id);

    if (!isUser) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }

    const newPost = new postModel({
      caption,
      hashtags,
      image,
      user_details_id,
      user_id: isUser._id,
    });

    const savePost = await newPost.save();

    res.status(201).json({
      data: savePost,
      message: "Post added successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    // console.log(1);
    const { id, user_id } = req.query;

    const isUser = await userModel.findById(user_id);

    if (!isUser) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }

    const isPost = await postModel.findById(id);

    if (!isPost) {
      return res.status(404).json({
        data: null,
        message: "Post does not exist",
      });
    }

    await postModel.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id, user_id } = req.params;

    const isUser = await userModel.findById(user_id);

    if (!isUser) {
      return res.status(404).json({
        data: null,
        message: "User not found",
      });
    }

    const isPost = await postModel.findById(id);

    if (!isPost) {
      return res.status(404).json({
        data: null,
        message: "Post does not exist",
      });
    }

    const updatePost = await postModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      data: updatePost,
      message: "Updated post details successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
