import { fail,redirect } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export async function load({locals}){
	const {user,supabase} = locals;
	if(!user){
		throw redirect(302,'/customer')
	}
	const {data:notes}=await supabase
	.from('user_notes')
	.select('id,notes,created_at')
	.eq("user_id",user.id)
	.order('created_at',{ascending:false})
	return{
		notes:notes??[]
	}
}

export const actions={
	default:async({request,locals})=>{
		const {user,supabase}=locals;
		if(!user){
			throw redirect(302,"/customer")
		}
		const formData=await request.formData();
		const notes=formData.get('notes');
		if(!notes){
			return fail(400,{error:"Content is required"})
		}
		const {data,error}=await supabase
		.from('user_notes')
		.insert({
			"user_id":user.id,
			notes
		})
		if(error){
			console.error("Error inserting note:", error);
			return fail(500,{error:"Unexpected error occurred"})
		}
		else{
			return {
				success:true,
				message:"note added successfully!"
			}
		}
	}
}