const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { verifyToken, isAdmin } = require("./middleware/auth");

const app = express();
const PORT = 3000;
const SECRET = "mysecretkey";

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/roleDB");

app.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();
  res.json({ message: "User created" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/user", verifyToken, (req, res) => {
  res.json({ message: "User route accessed" });
});

app.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Admin route accessed" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});