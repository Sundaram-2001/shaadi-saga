import express from "express";
import bp from "body-parser";
import router from "./routes/routes.js";
import cors from "cors"
const app = express();
import rateLimit from "express-rate-limit"

const limit=rateLimit({
  windowMs:15*60*1000,
  max:100,
  message: 'Too many requests from this IP, please try again later.'
})

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
