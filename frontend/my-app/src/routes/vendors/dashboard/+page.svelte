<script>
	import {onMount} from 'svelte';
	import {supabase} from '$lib/supabaseClient';
	/** @type {{ owner_name: string; business_name: string; [key: string]: any } | null } */
	let vendorData = null;
	let loading = true;
	let error = '';
	async function signOut() {
	const { error } = await supabase.auth.signOut();

	
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');

	if (error) {
		console.error("Sign out failed:", error.message);
		return;
	}

	
	window.location.href = '/vendors'; 
}
	onMount(async()=>{
		const access_token = localStorage.getItem('access_token');
		const refresh_token = localStorage.getItem('refresh_token');
		if (!access_token || !refresh_token){
			error="Not Logged In!"
			loading=false;
			return;
		}
		const { data, error: sessionError } = await supabase.auth.setSession({
			access_token: access_token,
			refresh_token: refresh_token
		});
		if (sessionError || !data.session) {
			error = "Session setup failed.";
			console.error(sessionError);
			loading = false;
			return;
		}
		const userId=data.session.user.id;
		const {data:vendor,error:vendorError}=await supabase
			.from('vendors')
			.select('*')
			.eq('user_id',userId)
			.single();
			if(vendorError){
				error="Could not fetch vendor data!";
				console.error(vendorError);
			}
			else{
			vendorData=vendor;
			console.log("Vendor data fetched:", vendorData);
			}
			loading=false;
	})

</script>
<main>

{#if loading}
	<p>Loading your dashboard...</p>
{:else if error}
	<p>{error}</p>
{:else}
	{#if vendorData}
		<h1>Welcome, {vendorData.owner_name}</h1>
		<p>Your business: {vendorData.business_name}</p>
		<button on:click={signOut} style="margin-top: 1rem;">
	Log Out
</button>
	{:else}
		<p>Vendor data not available.</p>
	{/if}
{/if}
</main>