const UserModel = require("../models/user.model");
const { hash, compare } = require("bcrypt");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("./middleware/auth.middleware");

const authenticateUser = async (req, res) => {
  try {
    const { account, password } = req.body;
    const user = await UserModel.findOne({
      $or: [{ username: account }, { email: account }],
    });
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    await user.updateOne({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: accessToken,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user != null) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await hash(password, 10);
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    if (!newUser) {
      return res.status(403).send("Failed to create user");
    } else {
      return res.status(201).send("Create user success!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { account } = req.body;
    const user = await UserModel.findOne({
      $or: [{ username: account }, { email: account }],
    });
    if (user) {
      await user.updateOne({ accessToken: "", refreshToken: "" });
      res.status(200).send("Logout success!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, accessToken } = req.body;

    let avatarURL = "";
    if (req.file) {
      avatarURL = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const user = await UserModel.findOne({ accessToken: accessToken });
    if (!user) {
      return res.status(404).send("User not found!");
    }
    await user.updateOne({
      username: username,
      email: email,
      avatar: avatarURL,
    });

    return res.status(200).send({
      username: user.username,
      email: user.email,
      avatar: avatarURL,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getUserList = async (req, res) => {
  try {
    const userList = await UserModel.find({});
    if (!userList) {
      res.status(404).json("Not found!");
    }
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUserList,
  authenticateUser,
  logoutUser,
  updateUser,
};
