import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getSupabaseClientWithAuth } from '../db/db.js';

const routes = express.Router();

routes.post("/vendors", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.decode(token);
    const user_id = decoded?.sub;

    console.log("Decoded user ID:", user_id);
    console.log("Request body:", req.body);

    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized: No user ID" });
    }

    const supabase = getSupabaseClientWithAuth(token); 

    const { business_name, locality, email, phone_number, vendor_type,owner_name } = req.body;

    const { error, data } = await supabase
      .from("vendors")
      .insert([
        {
          business_name,
          locality,
          email,
          phone_number,
          vendor_type,
          user_id, 
          owner_name
        },
      ]);

    if (error) {
      console.error("Insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Vendor added", data });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routes.post("/customers",async(req,res)=>{
  try {
    const token=req.headers.authorization?.split(' ')[1];
    const decoded=jwt.decode(token);
    const user_id=decoded?.sub;
    if (!user_id){
      return res.status(401).json({ error: "Unauthorized: No user ID" });

    }
    const supabase = getSupabaseClientWithAuth(token);
    // const data={name ,email ,date_of_wedding,area,fullPhoneNumber }
    console.log("request body:" , req.body);
    const { name, email, date_of_wedding, area, fullPhoneNumber } = req.body;
    const { error, data } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          date_of_wedding,
          area,
          phone_number:fullPhoneNumber,
          id:user_id, 
        },
      ]);
      if (error){
        console.error("Insert error:", error);
      console.error("Insert error:", error);
      return res.status(500).json({ "message":error.message });
      }
      res.status(200).json({ message: "Customer added", data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})
export default routes;
