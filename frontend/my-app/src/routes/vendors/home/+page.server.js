
import { redirect } from "@sveltejs/kit";

export async function load({ locals, url }) {
    const { supabase } = locals;
    const code = url.searchParams.get('code');

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            console.error('Magic link exchange error:', error.message);
        }
        throw redirect(302, '/vendors/home');
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw redirect(302, '/vendors');
    }

    return {
        user
    };
}