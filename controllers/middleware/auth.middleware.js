const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../../models/user.model");

const createAccessToken = ({ userId, username }) => {
  return jwt.sign({ userId, username }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "15s",
  });
};

const createRefreshToken = ({ userId, username }) => {
  return jwt.sign({ userId, username }, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: "1d",
  });
};

const sendAccessToken = ({ id, username, email, accessToken, avatar }) => {
  return {
    id,
    username,
    email,
    accessToken,
    avatar,
  };
};

const sendRefreshToken = (res, token) => {
  return res.cookie("refreshToken", token, {
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "lax",
  });
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    if (decoded != undefined) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ message: "Token invalid!" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const autoGenerateToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .json({ accessToken: "Not found refreshToken in cookies" });

  try {
    const { userId } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ accessToken: "" });
    } else {
      const newAccessToken = createAccessToken({
        userId: user._id,
        username: user.username,
      });
      await user.updateOne({ accessToken: newAccessToken });
      return res.status(200).json({ accessToken: newAccessToken, user: user });
    }
  } catch (error) {
    return res.status(403).json({ accessToken: "" });
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  verify,
  autoGenerateToken,
};
