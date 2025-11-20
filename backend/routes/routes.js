import { Router } from "express";
import { supabase } from "../config/supabaseClient.js";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/",async (req,res)=>{
  const {name,value}=req.body;
  if (!name || !value){
    res.status(400).json({
      "message":"invalid request body!!!!"
    })
  }
  const {data,error}=await supabase.from("test").insert([{
    name,value
  }])
  if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, data });
})

export default router;
