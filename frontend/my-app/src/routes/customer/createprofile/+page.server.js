import { redirect } from "@sveltejs/kit";
export const actions={
    default:async ({request,locals})=>{
        const user=locals.user;
        const supabase=locals.supabase;
        if(!user){
            throw redirect(302,"/customer");
        }
        const formData=await request.formData();
    const name=formData.get("name");
        const email=formData.get("email");
        const phone_number=formData.get("phone_number");
        const country_code=formData.get("country_code") || '+91';
        const date_of_wedding=formData.get("date_of_wedding");
        const area=formData.get("area");
        const fullPhoneNumber = `${country_code}${phone_number}`;
        console.log(email,fullPhoneNumber,date_of_wedding,area);
    }
}