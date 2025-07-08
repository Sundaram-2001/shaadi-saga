<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let favouriteVendors: Array<{ [key: string]: any }> = [];

	onMount(async () => {
		const access_token = localStorage.getItem('access_token');
		const refresh_token = localStorage.getItem('refresh_token');

		if (!access_token || !refresh_token) {
			alert('Kindly login to continue!');
			goto('/customer');
			return;
		}

		const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
			access_token,
			refresh_token
		});

		if (sessionError || !sessionData.session) {
			alert('Session expired, please login again!');
			goto('/customer');
			return;
		}

		const userId = sessionData.session.user.id;

		const { data, error } = await supabase
			.from('favourites')
			.select('vendors(*)') 
			.eq('user_id', userId);

		if (error) {
			console.error('Error fetching favourites:', error);
			alert('Unable to fetch your favourites.');
			return;
		}

		favouriteVendors = data.map((f) => f.vendors);
	});
</script>

<main>
	<h2>Your Favourite Vendors</h2>

	{#if favouriteVendors.length > 0}
		<div class="vendor-list">
			{#each favouriteVendors as vendor}
				<div class="vendor-card">
					<h3>{vendor.business_name}</h3>
					<p><strong>Owner:</strong> {vendor.owner_name}</p>
					<p><strong>Phone:</strong> {vendor.phone_number}</p>
					<p><strong>Email:</strong> {vendor.email}</p>
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-vendors">No favourites found yet!</p>
	{/if}
</main>

<style>
	main {
		max-width: 900px;
		margin: 2rem auto;
		padding: 1rem;
		font-family: system-ui, sans-serif;
	}

	h2 {
		text-align: center;
		margin-bottom: 2rem;
		color: #333;
	}

	.vendor-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.vendor-card {
		background-color: #fff;
		border: 1px solid #e2e8f0;
		padding: 1.25rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	.vendor-card h3 {
		margin-bottom: 0.5rem;
		color: #2d3748;
	}

	.vendor-card p {
		margin: 0.25rem 0;
		color: #4a5568;
		font-size: 0.95rem;
	}

	.no-vendors {
		text-align: center;
		color: #718096;
		font-size: 1.1rem;
		margin-top: 2rem;
	}
</style>
