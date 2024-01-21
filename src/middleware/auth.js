import { verify } from "jsonwebtoken";
import User from "../model/User";

const auth = async (req, res, next) => {
  try {
    // Taking token from the authorization header
    const token = req.headers.authorization.replace("Bearer ", "");

    // Finding whether the token supplied is valid or not
    const decoded = verify(token, process.env.secretKey);

    // If token is valid then finding the user who have that token
    const user = await User.findById(decoded._id);

    // Iterating over the tokens array of the user
    const isValidToken = user.tokens.find(tokenObject => {
      return tokenObject.token === token;
    });

    if (!isValidToken) {
      throw new Error("User dont have such token");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default auth;
