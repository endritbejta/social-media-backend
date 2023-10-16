import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Acess Denied!");
    }

    if (token.starsWith("Bearer ")) {
      token = token.slice(7, token.length).trimleft();
    }

    const verified = jwt.verify(token, process.env.JWT_SERCRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
