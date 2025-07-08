// src/hooks.server.js
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle = async ({ event, resolve }) => {
	const supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookies) => {
				cookies.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			},
			delete: (name, options) => {
				event.cookies.delete(name, { ...options, path: '/' });
			}
		}
	});

	event.locals.supabase = supabase;

	const {
		data: { session }
	} = await supabase.auth.getSession();

	event.locals.session = session;
	event.locals.user = session?.user ?? null; 

	return resolve(event);
};
