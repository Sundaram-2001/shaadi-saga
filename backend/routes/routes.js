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

router.get("/vendortype",async(req,res)=>{
  const{data,error}=await supabase.from("vendor_types")
  .select("*")
  .eq("is_active", true)
  if(error){
    console.error(error)
    res.status(500).send("Nothing to display")
  }
  return res.status(200).json(data)
});

router.get("/verifyuser", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization Header" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid Token Format" });
    }

    
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(403).json({ error: "Token is invalid or expired" });
    }

    res.json({ message: "Token verified", userId: user.id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
export default router;
