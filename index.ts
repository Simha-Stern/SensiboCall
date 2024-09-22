import express from "express";

import router from "./src/router/router";
// import axios from "./src/remoteControl/axios";
import controller from "./src/remoteControl/controller";

const PORT = 3333;

const app = express();

app.use("/", router.asExpressRouter);

// app.use("/", async (req, res) => {
//   try {
//     // const devices = await controller.getAllDevices();
//     const devices = await controller.getDeviceInfo("95KfGJuo");
//     // const devices = await controller.getACStates("mKxeUo57");
//     // const devices = await controller.setACState("2HdwRYYG", {
//     //   acState: {
//     //     on: true,
//     //     mode: "cool",
//     //     fanLevel: "low",
//     //     targetTemperature: 23,
//     //   },
//     // });
//     res.send(devices); // Send the data after it's fetched
//   } catch (error) {
//     res.status(500).send({ error: "Failed to fetch devices", details: error });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
