import postSchema from "../models/postModel.js";
import commentsSchema from "../models/commentModel.js";
import userSchema from "../models/userModel.js";
import { APIPagination } from "../pagination.js";
export const postController = {
  // Create a new Post
  async createPost(req, res) {
    try {
      const { caption, images } = req.body;
      if (images.length === 0) {
        return res.status(500).json({ msg: "Please Add Images" });
      }
      const newPost = await new postSchema({
        caption,
        images,
        user: req.user._id,
      });
      await newPost.save();
      res.status(201).json({
        msg: "Created Post!",
        newPost: {
          ...newPost._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get All Posts follwoing and posts mine
  async getPosts(req, res) {
    try {
      const postsPagination = new APIPagination(
        postSchema.find({ user: [...req.user.following, req.user._id] }),
        req.query
      ).pagination();

      const posts = await postsPagination.query
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname  followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });
      res.json({
        msg: "Success!",
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Update Post after Edit
  async updatePost(req, res) {
    try {
      const { caption, images } = req.body;
      const post = await postSchema
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            caption,
            images,
          }
        )
        .populate("user likes", "avatar username fullname");

      res.json({
        msg: " Update Success",
        post: {
          ...post._doc,
          caption,
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Delete Post
  async deletePost(req, res) {
    try {
      const postRemoved = await postSchema.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      const commentsRemoved = await commentsSchema.deleteMany({
        _id: { $in: postRemoved.comments },
      });

      res.json({
        msg: "Deleted Post !",
        newPost: {
          ...postRemoved._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // LIKE POST
  async likePost(req, res) {
    try {
      const postLiked = await postSchema.where({ _id: req.params.id }).update({
        $push: { likes: req.user._id },
      });
      // handle catch error (Post Deleted) don't add Like
      if (!postLiked) {
        return res.status(400).json({ msg: "This Post is Deleted!" });
      }

      res.json({
        msg: "Liked post !",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // UnLIKE POST
  async unLikePost(req, res) {
    try {
      const postUnLiked = await postSchema
        .where({ _id: req.params.id })
        .update({
          $pull: { likes: req.user._id },
        });
      // handle catch error (Post Deleted) don't add  Unlike
      if (!postUnLiked) {
        return res.status(400).json({ msg: "This Post is Deleted!" });
      }
      res.json({
        msg: "Liked post !",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get All Post Profile User
  async getPostsUser(req, res) {
    try {
      const userPostPagination = new APIPagination(
        postSchema.find({ user: req.params.id }),
        req.query
      ).pagination();
      const posts = await userPostPagination.query.sort("-createdAt");
      res.json({
        posts,
        postsCount: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // get Post Details
  async getDetailsPost(req, res) {
    try {
      const post = await postSchema
        .findById({ _id: req.params.id })
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });
      // handle catch error (Post Deleted) don't Show Detail Post
      if (!post) {
        return res.status(400).json({ msg: "This Post is Deleted!" });
      }
      res.json({
        post,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get Posts in Explore Page (not Following)
  async getPostsExplorePage(req, res) {
    try {
      const allPostsFriends = [...req.user.following, req.user._id];
      const num = req.query.num || 9;
      // Get All User Not Following
      const posts = await postSchema.aggregate([
        { $match: { user: { $nin: allPostsFriends } } }, // dont Friends
        { $sample: { size: Number(num) } }, // return size of num  (Randomly)
      ]);

      return res.json({
        msg: "Success!",
        posts,
        postsCount: posts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Save Post in user
  async savePost(req, res) {
    try {
      // Check post is saved ? => Handle Save one only
      const user = await userSchema.find({
        _id: req.user._id,
        saved: req.params.id,
      });
      if (user.length > 0) {
        return res.status(400).json({ msg: "Youe Saved This Post." });
      }

      // Save Post
      const postSaved = await userSchema.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        { $push: { saved: req.params.id } },
        { new: true }
      );
      if (!postSaved) {
        return res.status(400).json({ msg: "This User does not exist" });
      }
      res.json({ msg: "Post Saved" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // UnSave Post in user
  async unSavePost(req, res) {
    try {
      // UnSave Post
      const postUnSaved = await userSchema.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        { $pull: { saved: req.params.id } },
        { new: true }
      );
      if (!postUnSaved) {
        return res.status(400).json({ msg: "This User does not exist" });
      }
      res.json({ msg: "Post UnSaved" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get Save Posts
  async getSavePosts(req, res) {
    try {
      const postsPagination = new APIPagination(
        postSchema.find({ _id: { $in: req.user.saved } }),
        req.query
      ).pagination();
      const postsSave = await postsPagination.query.sort("-createdAt");
      res.json({
        posts: postsSave,
        postsCount: postsSave.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
