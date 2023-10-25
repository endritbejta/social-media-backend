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

  console.log("DB Connected");
    const refreshTokens = [];

    // Middleware to verify access token
    function authenticateAccessToken(req, res, next) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.sendStatus(401);
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    }

    app.post('/login', (req, res) => {

      const username = req.body.username;
      // Check the user's credentials here and, if valid, generate tokens
      // ...

      if (username) {
        const user = { name: username };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        // Store the refresh token in your database
        refreshTokens.push(refreshToken);

        res.json({ accessToken, refreshToken });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    });

    // Your protected route using the authenticateAccessToken middleware
    app.get('/protected', authenticateAccessToken, (req, res) => {
      // Access token is verified, and you can access the user data via req.user
      res.json({ message: 'Protected data', user: req.user });
    });
    app.post("/auth/register", register);
    app.use("/auth", authRoutes);
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

  