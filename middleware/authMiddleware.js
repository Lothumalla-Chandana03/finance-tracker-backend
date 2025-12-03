// importing jsonwebtoken library to verify the user's token
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // taking the token from the request header (Authorization)
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("token received:", token);

  // if no token is found, stop here and send error
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // verifying the token using the secret stored in .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token:", decoded);

    // storing the user id inside req.user so we can use it later in controllers
    req.user = { id: decoded.id };

    // move to the next function (controller)
    next();
  } catch (err) {
    // if token is wrong or expired, send error response
    return res.status(401).json({ message: "Invalid token" });
  }
};
