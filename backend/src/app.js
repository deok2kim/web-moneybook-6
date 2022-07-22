const express = require("express");
const app = express();
const PORT = 5001;

app.get("/", (req, res) => {
  res.send("backend init");
});

app.listen(PORT, () => {
  console.log(`SERVER START: PORT-${PORT}`);
});
