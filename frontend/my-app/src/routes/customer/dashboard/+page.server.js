import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;
	const supabase = locals.supabase;

	if (!user) {
		throw redirect(302, '/customer');
	}

	
	const { data: customer, error } = await supabase
		.from('users') 
		.select('*')
		.eq('id', user.id)
		.single();

	if (error || !customer) {
		throw redirect(302, '/customer/createprofile');
	}
	const {data:userEvents,error:eventsError}=await supabase
	.from('user_events')
	.select('*')
	.eq('user_id', user.id);
	if(eventsError){
		console.error("Error fetching user events:", eventsError);

	}
	return{
		customer,
		userEvents : userEvents || [],
		eventsError: eventsError || null
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