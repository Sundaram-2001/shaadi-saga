import express from "express";
import bp from "body-parser";
import router from "./routes/routes.js";
import cors from "cors"
const app = express();



app.use(cors({
  origin:"http://localhost:5173",
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use("/", router);

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
