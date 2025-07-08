import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
const user = locals.user;
const supabase = locals.supabase;

if (!user) {
	throw redirect(302, '/vendors');
}

const { data: vendor, error } = await supabase
	.from('vendors')
	.select('*')
	.eq('user_id', user.id)
	.single();

if (!vendor || error) {
	throw redirect(302, '/vendors/createprofile');
}

return { vendor };
}