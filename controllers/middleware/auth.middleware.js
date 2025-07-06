const { sign } = require("jsonwebtoken");

const createAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "30s",
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: "1d",
  });
};

const sendAccessToken = (res, { id, username, email, accessToken, avatar }) => {
  return res.status(200).send({
    id,
    username,
    email,
    accessToken,
    avatar,
  });
};

const sendRefreshToken = (res, token) => {
  return res.status(200).cookie("refreshToken", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
