import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
const user = locals.user;
const supabase = locals.supabase;

if (!user) {
	throw redirect(302, '/vendors');
}
 return {
	user
 }
}