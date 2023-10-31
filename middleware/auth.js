import JWT from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication== failed");
  }

  const token = authHeader?.split(" ")[1];

  try {
    const userToken = JWT.verify(token, `${process.env.JWT_SECRET}`);

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export default verifyToken;


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

  