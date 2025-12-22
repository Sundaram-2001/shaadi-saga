import { Router } from "express";
import { supabase } from "../config/supabaseClient.js";
import { SIGN_OUT_SCOPES } from "@supabase/supabase-js";
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

router.get("/verifyuser",async(req,res)=>{
  const authParam=req.headers.authorization
  if(!authParam){
    return res.status(401).json({error:"Missing authorization header"})
  }
  const  token=authParam.split(' ')[1]
  if(!token){
    return res.status(401).json({error:"Invalid token"})
  }
  const {data:{user},error}=await supabase.auth.getUser(token)
  try{
  if(error || !user){
    return res.status(403).json({error:"token invalid or expired"})
  }
  const {data:vendorData,error:dbError}=await supabase
  .from('vendors')
  .select('id')
  .eq('user_id',user.id)
  .maybeSingle()
  if (dbError) {
        throw dbError; 
    }
  const hasProfile=!!vendorData
  res.json({
    message:"Check complete",
    hasProfile:hasProfile
  })
}catch(err){
  console.error(err)
  res.status(500).json({ error: "Server Error" });
}
})


router.post("/addVendor",async(req,res)=>{
  console.log(`${req.method} ${req.originalUrl} request received..`)
  try {
    const {owner_name,business_name,locality,email,phone_number,vendor_type}=req.body
    console.log(`request body restructured ${owner_name} ${business_name}`)
    if(!owner_name || !business_name || !vendor_type){
      console.warn(`${req.method} ${req.originalUrl} invalid request body`)
      console.warn(req.body)
      res.status(400).json({"message":"Invalid request body, kindly check your request body"})
    }

    const accessToken=req.headers.authorization
    // if(!payload){
    //   console.warn("did not pass the valid request body")
    //   return res.status(400).json({"message":"Kindly check your request body!!!"})
    // }
    if(!accessToken){
      console.warn(`${req.method} ${req.originalUrl} token is missing or invalid`)
      return  res.status(401).json({"message":"Invalid session"})
    }
    const token=accessToken.split(' ')[1]
    const {data:{user},error:userError}=await supabase.auth.getUser(token)
    console.log(user.id)
    if(!user || userError){

      console.warn("User fetch failed..")
      return res.status(404).json({"message":"user not found!!!"})
    }
    const {data,error}=await supabase.from('vendors').insert([{
      owner_name,
      business_name,
      locality,
      email,
      phone_number,
      vendor_type,
      user_id: user.id
    }])
    if(error){
      console.error("Database Error",error)
      return res.status(500).json({"message":"Ïnternal Server Error"})
    }
    return res.status(200).json({"message":"Vendor profile created successfully!"})
    //  const {owner_name,business_name,locality,email,phone_number,vendor_type}=req.body
  } catch (err) {
    console.error("Unexpected Error",err)
    return  res.status(500).json({ message: "We couldn't save your profile. Please contact support." });  }
  
})
export default router;
