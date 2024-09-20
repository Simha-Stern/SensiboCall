import express from "express";

import router from "./src/router/router";
import axios from "./src/remoteControl/axios";
import service from "./src/remoteControl/service";

const PORT = 3333;

const app = express();

// app.use("/", router.asExpressRouter);

app.use("/", async (req, res) => {
  try {
    const devices = await service.getAllDavices(); // Wait for the function to complete
    console.log("🚀 ~ app.use ~ devices:", devices)
    res.send(devices);  // Send the data after it's fetched
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch devices", details: error});
  }
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
