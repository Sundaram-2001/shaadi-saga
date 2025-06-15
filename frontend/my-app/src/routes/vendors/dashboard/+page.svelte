<script>
// @ts-nocheck

	import { supabase } from '$lib/supabaseClient';
	// @ts-ignore
	let vendorData = null;

	// @ts-ignore
	onMount(async () => {
		const { data: sessionData } = await supabase.auth.getSession();
		const userId = sessionData.session?.user.id;

		if (userId) {
			const { data, error } = await supabase
				.from('vendors')
				.select('*')
				.eq('user_id', userId)
				.single();

			if (!error) {
				vendorData = data;
			}
		}
	});
</script>

{#if vendorData}
	<h1>Welcome, {vendorData.owner_name}</h1>
{/if}
