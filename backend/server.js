import express from "express";
import bp from "body-parser";
import router from "./routes/routes.js";

const app = express();

app.use(bp.json());

app.use("/", router);

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
