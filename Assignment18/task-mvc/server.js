const express = require("express");
const app = express();

const taskRoutes = require("./routes/taskRoutes");

const PORT = 3000;

app.use(express.json());

app.use("/", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});