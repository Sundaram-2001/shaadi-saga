<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let loading = true;
	// @ts-ignore
	/**
     * @type {{ name: any; } | null}
     */
	let userData = null;

	onMount(async () => {
		const access_token = localStorage.getItem('access_token');
		const refresh_token = localStorage.getItem('refresh_token');

		if (!access_token || !refresh_token) {
			alert("Kindly Login to continue!");
			goto('/customer');
			return;
		}

		const { data, error: sessionError } = await supabase.auth.setSession({
			access_token,
			refresh_token
		});

		if (sessionError || !data.session) {
			alert("Session setup failed. Please log in again.");
			console.error(sessionError);
			loading = false;
			return;
		}

		const userId = data.session.user.id;
		const { data: customer, error: customerError } = await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.single();

		if (customerError) {
			alert("Could not fetch data, don't fret! Kindly try again later.");
			console.error(customerError);
		} else {
			userData = customer;
			console.log("User data fetched:", userData);
		}

		loading = false;
	});

	async function logout() {
		await supabase.auth.signOut();
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		goto('/customer');
	}
</script>

<style>
	main {
		padding: 2rem;
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.welcome {
		font-size: 1.5rem;
		color: #333;
		margin-bottom: 1.5rem;
	}

	.name {
		color: #e91e63;
		font-weight: bold;
	}

	button.logout {
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #e91e63;
		color: white;
		font-weight: bold;
		cursor: pointer;
	}

	button.logout:hover {
		background-color: #d81b60;
	}
</style>

<main>
	{#if loading}
		<p>Loading your dashboard...</p>
	{:else if userData}
		<p class="welcome">
			Welcome to Shaadi Saga, <span class="name">{userData.name}</span>!
		</p>
		<button class="logout" on:click={logout}>Logout</button>
	{:else}
		<p>Oops! We couldn’t find your profile info.</p>
	{/if}
</main>
