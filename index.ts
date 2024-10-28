import express from "express";
import yemotRouter from "./src/router/router";
// import controller from "./src/remoteControl/controller";

const PORT = 3333;

const app = express();

app.use("/", yemotRouter.asExpressRouter);
// app.use("/", async (req, res) =>
//   res.send(await controller.getAllDevices("meFwVzgdw4o5TYUuGewFsuAAIUX9sm"))
// )

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
