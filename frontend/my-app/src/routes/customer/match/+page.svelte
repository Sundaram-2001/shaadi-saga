<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let vendorType = '';
	let area = '';
	/** @type {{ id: number, business_name: string, owner_name: string, phone_number: string, email: string, [key: string]: any }[]} */
	let matchingVendors: { id: number, business_name: string, owner_name: string, phone_number: string, email: string, [key: string]: any }[] = [];
	let favouritedVendorIds = new Set();
	let userId = '';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		vendorType = urlParams.get('vendor')?.trim() ?? '';
		area = urlParams.get('area')?.trim() ?? '';

		const access_token = localStorage.getItem('access_token');
		const refresh_token = localStorage.getItem('refresh_token');

		if (!access_token || !refresh_token) {
			alert('Kindly login to continue!');
			goto('/customer');
			return;
		}

		const { data, error: sessionError } = await supabase.auth.setSession({
			access_token,
			refresh_token
		});

		if (sessionError || !data.session) {
			alert('Setup failed, kindly login to continue!');
			console.error(sessionError);
			goto('/customer');
			return;
		}

		userId = data.session.user.id;

		await fetchMatchingVendors();
		await fetchFavourites();
	});

	async function fetchMatchingVendors() {
		const { data: vendors, error } = await supabase
			.from('vendors')
			.select('*')
			.ilike('vendor_type', vendorType)
			.ilike('locality', area);

		if (error) {
			alert('Error fetching vendors at the moment!');
			console.error(error);
			return;
		}
		matchingVendors = vendors;
	}

	async function fetchFavourites() {
		const { data, error } = await supabase
			.from('favourites')
			.select('vendor_id')
			.eq('user_id', userId);

		if (error) {
			console.error('Error fetching favourites:', error);
			return;
		}

		favouritedVendorIds = new Set(data.map(f => f.vendor_id));
	}

	async function addToFavourites(vendorId: number) {
		if (favouritedVendorIds.has(vendorId)) {
			alert('Already added to favourites!');
			return;
		}

		const { error } = await supabase
			.from('favourites')
			.insert({ user_id: userId, vendor_id: vendorId });

		if (error) {
			console.error('Failed to add to favourites:', error);
			alert('Could not add to favourites.');
			return;
		}

		favouritedVendorIds.add(vendorId);
		alert('Added to favourites!');
	}
</script>

<main>
	<h2>Matching Vendors</h2>

	{#if matchingVendors.length > 0}
		<div class="vendor-list">
			{#each matchingVendors as vendor}
				<div class="vendor-card">
					<h3>{vendor.business_name}</h3>
					<p><strong>Owner:</strong> {vendor.owner_name}</p>
					<p><strong>Phone:</strong> {vendor.phone_number}</p>
					<p><strong>Email:</strong> {vendor.email}</p>
					<div class="actions">
						<button
							class="fav-btn"
							on:click={() => addToFavourites(vendor.id)}
							disabled={favouritedVendorIds.has(vendor.id)}
						>
							{favouritedVendorIds.has(vendor.id) ? '✅ Favourited' : '❤️ Favourite'}
						</button>
						<button class="book-btn">Send Quotation</button>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-vendors">No matching vendors found!</p>
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
		transition: transform 0.2s ease;
	}

	.vendor-card:hover {
		transform: scale(1.015);
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

	.actions {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
	}

	button {
		flex: 1;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.fav-btn {
		background-color: #edf2f7;
		color: #e53e3e;
	}

	.book-btn {
		background-color: #3182ce;
		color: white;
	}

	.no-vendors {
		text-align: center;
		color: #718096;
		font-size: 1.1rem;
		margin-top: 2rem;
	}
</style>
