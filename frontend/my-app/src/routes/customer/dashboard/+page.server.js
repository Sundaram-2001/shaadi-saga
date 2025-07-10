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

	return { customer };
}
