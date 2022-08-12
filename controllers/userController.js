import UserSchema from "../models/userModel.js";

export const userController = {
  // Search Users
  async searchUsers(req, res) {
    try {
      const users = await UserSchema.find({
        username: { $regex: req.query.username },
      })
        .limit(11)
        .select("fullname username avatar");
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get user
  async getUser(req, res) {
    try {
      const user = await UserSchema.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");
      if (!user) return res.status(404).json({ msg: "User not found" });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update Profile User
  async updateUser(req, res) {
    try {
      const { avatar, fullname, bio, address, number, gender, website } =
        req.body;
      if (!fullname)
        return res.status(4001).json({ msg: "Please Add Your Fullname" });

      await UserSchema.findOneAndUpdate(
        { _id: req.body._id },
        {
          avatar,
          fullname,
          bio,
          address,
          number,
          gender,
          website,
        }
      );
      res.json({ msg: "Update Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // add Followers and Following
  async follow(req, res) {
    // *Info get get user from request   user === Auth middleware*
    try {
      // check followed user
      const user = await UserSchema.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0) {
        return res.status(500).json({ msg: "Your followed this user ." });
      }

      // Add Followers
      await UserSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      );
      // Add Following

      const addFollowing = await UserSchema.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "You follow this user now" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // remove Followers and following
  async unFollow(req, res) {
    try {
      // Remove Followers
      const removeFollow = await UserSchema.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      );
      // Remove Following
      const removeFollowing = await UserSchema.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "You unfollow this user now" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get Suggestion User Not  => Following and Followers
  async suggestionUser(req, res) {
    try {
      const allFollowing = [...req.user.following, req.user._id];
      const num = 5;
      // Get All User Not Following
      const users = await UserSchema.aggregate([
        { $match: { _id: { $nin: allFollowing } } }, // dont following
        { $sample: { size: num } }, // return size of num  (Randomly)
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({
        users,
        usersCount: users.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
