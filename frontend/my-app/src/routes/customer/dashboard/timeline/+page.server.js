import { redirect,fail } from "@sveltejs/kit";


export const actions = {
	default: async ({ request, locals }) => {
		const user = locals.user;
		const supabase = locals.supabase;

		if (!user) {
			throw redirect(302, "/customer");
		}

		const formData = await request.formData();
		const event_name = formData.get("event_name");
		const event_date = formData.get("event_date");
		const comments = formData.get("comments");
        const { data: existingEvent, error: selectError } = await supabase
	.from('user_events')
	.select('*')
	.eq('user_id', user.id)
	.eq('event_name', event_name)
	.eq('event_date', event_date)
	.single();

if (existingEvent) {
	return fail(400, {
		error: `You've already added "${event_name}" on that date.`
	});
}

        const {error}=await supabase 
        .from('user_events')
        .insert({
            user_id: user.id,
            event_name,
            event_date,
            comments   
        })
        if (error) {
            console.error("Error creating event:", error);
            return fail(500, { error:"Error adding the event!   " });
        }
        return { success: "Event added successfully!" };
    }
};
