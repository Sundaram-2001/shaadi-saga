import { error, redirect } from '@sveltejs/kit';


export async function load({locals}){
    const { user, supabase } = locals; // Destructure locals for cleaner code
    if(!user){
        throw redirect(302,"/customer/auth");
    }
    // ... rest of the code to fetch the user profile ...
    const {data:userProfile,error:dbError}=await supabase.from("users")
    .select("*")
    .eq("user_id",user.id)
    .single()
    // ... error handling and return ...
    if(dbError){
        console.error("error fetching details:",dbError)
        throw error(500,"Unexpected error, kindly come back later!")
    }
    if(!userProfile){
        throw redirect(302,"/customer/onboarding");
    }
    return{
        user,userProfile
    }
}
export const actions={
	default:async({request,locals})=>{
		const user = locals.user;
		const supabase=locals.supabase;
		if (!user){
			throw redirect (302,"/customer")
		}
		const formData=await request.formData();
		const event_name=formData.get("event_name");
		const event_date=formData.get("event_date");
		const {error}=await supabase
		.from('user_events')
		.update({event_date})
		.eq('user_id', user.id)
		.eq('event_name', event_name);
		if(error){
			console.error("Error updating event date:", error);
			return fail(400, { error: 'Could not update event date.' });
		}
		return { success: 'Event date updated successfully!' };
	}
}