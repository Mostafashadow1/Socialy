import userSchema from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authController = {
  register: async (req, res) => {
    try {
      const { fullname, username, password, email } = req.body;
      // remove white space and return username lowercase
      let newUserName = username.replace(/ /g, "");
      // check username in database or no
      const usernameHere = await userSchema.findOne({ username, newUserName });
      if (usernameHere) {
        return res.status(400).json({ msg: "User Name already exists !" });
      }

      // check Email in database or no
      const emailHere = await userSchema.findOne({ email });
      if (emailHere) {
        return res.status(400).json({ msg: "Email already exists !" });
      }

      // check Password less 6
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });
      }

      // make Hashing password
      const passwordHash = await bcrypt.hash(password, 12);

      // Create User in database
      const newUser = new userSchema({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
      });

      // get function to  make Access Token
      const AccessToken = createAccessToken({ id: newUser._id });

      // get function to Refresh Access Token
      const RefreshToken = refreshAccessToken({ id: newUser._id });

      // create cookie listen to refreshAccessToken (reload page)
      res.cookie("refreshtoken", RefreshToken, {
        httpOnly: true,
        path: "/api/refreshtoken",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 Month
      });
      // Save User in database
      await newUser.save();
      res.json({
        msg: "Rejester Success ",
        AccessToken,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check user In Database or now and populte
      const userFound = await userSchema
        .findOne({ email })
        .populate(
          "followers following",
          "avatar username fullname followers following"
        );
      if (!userFound) {
        return res
          .status(401)
          .json({ msg: "This Email Does not exist Please Regester" });
      }

      // return real password
      const matchPassword = await bcrypt.compare(password, userFound.password);
      if (!matchPassword) {
        return res.status(401).json({ msg: "Password is incorrect" });
      }

      // get Access Token
      const AccessToken = createAccessToken({ id: userFound._id });
      // get function to Refresh Access Token
      const RefreshToken = refreshAccessToken({ id: userFound._id });
      // get cookie
      res.cookie("refreshtoken", RefreshToken, {
        httpOnly: true,
        path: "/api/refreshtoken",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 Month
      });

      res.json({
        msg: "Login Success.",
        AccessToken,
        user: {
          ...userFound._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      // Clear token from client
      res.clearCookie("refreshtoken", { path: "/api/refreshtoken" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  genrateAccessToken: async (req, res) => {
    try {
      const RefreshToken = req.cookies.refreshtoken;
      if (!RefreshToken)
        return res.status(400).json({ msg: "Please login now." });
      jwt.verify(
        RefreshToken,
        process.env.REFRESH_TOKEN,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now." });

          const getUser = await userSchema
            .findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "_id avatar username fullname followers following "
            );
          if (!getUser)
            return res.status(400).json({ msg: "This does not exist." });
          const AccessToken = createAccessToken({ id: result.id });
          res.json({
            AccessToken,
            user: getUser,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

// Access Tokens

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1d" }); // 1 day
};

const refreshAccessToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" }); // 30 days
};
