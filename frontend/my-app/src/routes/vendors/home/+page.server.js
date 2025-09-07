// src/routes/home/+page.server.js
import { redirect } from "@sveltejs/kit";

export async function load({ locals, url }) {
    const { supabase } = locals;
    const code = url.searchParams.get('code');

    if (code) {
        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            console.error('Magic link exchange error:', error.message);
        }
        // Redirect to a clean URL to remove the code from the address bar
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