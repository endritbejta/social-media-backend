import express from "express";

import { createUser } from "../controllers/user.js";

//same as /controllers/user.js file

const router = express.Router();

router.post("/users", createUser);

export default router;
