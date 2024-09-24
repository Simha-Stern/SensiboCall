import express from "express";
import yemotRouter from "./src/router/router";

const PORT = 3333;

const app = express();

app.use("/", yemotRouter.asExpressRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
