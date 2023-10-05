import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 9999;

app.get("/", (req, res) => {
  res.send("Nderime atdheut.");
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
