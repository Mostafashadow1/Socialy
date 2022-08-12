import commentsSchema from "../models/commentModel.js";
import postScheme from "../models/postModel.js";
export const commentController = {
  
  // Create a new comment
  async createComment(req, res) {
    try {
      const { postId, comment, tag, reply, userPostId } = req.body;
      // handle catch error (post Deleted) don't add Comment
      const post = await postScheme.findById(postId);
      if (!post) return res.status(400).json({ msg: "This Post is Deleted!" });
      // handle catch error (comment Deleted) don't add reply
      if (reply) {
        const comment = await commentsSchema.findById(reply);
        if (!comment)
          return res.status(400).json({ msg: "This Comment is Deleted!" });
      }
      const newComment = new commentsSchema({
        comment,
        tag,
        reply,
        user: req.user._id,
        userPostId,
        postId,
      });

      await postScheme.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );
      await newComment.save();
      res.json({ newComment });
    } catch (err) {
      return res.status(501).json({ err: err.message });
    }
  },

  // Update Comment After Edit
  async UpdateComment(req, res) {
    try {
      const { comment } = req.body;
      await commentsSchema.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { comment }
      );
      res.json({
        msg: "Comment Updated",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Like Comment
  async likeComment(req, res) {
    try {
      await commentsSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({
        msg: "Liked Comment !",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Un Liked Comment
  async unLikeComment(req, res) {
    try {
      await commentsSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({
        msg: "UnLiked Comment!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  async deleteComment(req, res) {
    try {
      const comment = await commentsSchema.findOneAndDelete({
        _id: req.params.id,
        $or: [
          { user: req.user._id }, // Comment Mine
          { postUserId: req.user._id }, // Comment Other
        ],
      });
      await postScheme.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );
      res.json({ msg: "Deleted Comment !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
