import { error, redirect } from "@sveltejs/kit";

export async function load({locals}){
	const user=locals.user
	const supabase=locals.supabase
	if(!user){
		throw redirect(302,"/login")
	}
	const {data:userDetails,error:dbError}=await supabase.from("vendors")
	.select("*")
	.eq("user_id",user.id)
	.single()
	if(dbError){
		console.error("Database Error:",dbError)
		throw error(500,"Unexpected error, kindly come back later!")
	}
	if(!userDetails){
		throw error(404,"User not found!")
	}
	return{
		user,
		userDetails
	}
}