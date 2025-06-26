<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let vendorType = '';
	let area = '';
	let matchingVendors: { id: number, business_name: string, owner_name: string, phone_number: string, email: string, [key: string]: any }[] = [];
	let favouritedVendorIds = new Set();
	let userId = '';
	let access_token = '';

	let showModal = false;
	let selectedVendorId: number | null = null;

	let customerPhone = '';
	let customerName = '';
	let customerEmail = '';
	let customerMessage = '';
	let eventDate = '';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		vendorType = urlParams.get('vendor')?.trim() ?? '';
		area = urlParams.get('area')?.trim() ?? '';

		access_token = localStorage.getItem('access_token') || '';
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

	function openCallbackModal(vendorId: number) {
		selectedVendorId = vendorId;
		showModal = true;
	}

	async function submitCallbackForm() {
		if (!customerPhone || !customerName) {
			alert('Please fill in the required fields.');
			return;
		}

		try {
			const response = await fetch('http://localhost:3000/requestCallback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access_token}`
				},
				body: JSON.stringify({
					vendor_id: selectedVendorId,
					customer_name: customerName,
					customer_phone: customerPhone,
					customer_email: customerEmail,
					event_date: eventDate || null,
					message: customerMessage
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error('Failed to send callback request');

			alert(result.message || 'Callback request sent successfully!');
			showModal = false;
			customerPhone = '';
			customerName = '';
			customerEmail = '';
			customerMessage = '';
			eventDate = '';
		} catch (err) {
			console.error(err);
			alert('Something went wrong.');
		}
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
						<button class="book-btn" on:click={() => openCallbackModal(vendor.id)}>
							Request Callback
						</button>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="no-vendors">No matching vendors found!</p>
	{/if}
</main>

{#if showModal}
	<div class="modal-overlay">
		<div class="modal">
			<h3>Request a Callback</h3>
			<label>
				Name*:
				<input type="text" bind:value={customerName} required />
			</label>
			<label>
				Phone*:
				<input type="text" bind:value={customerPhone} required />
			</label>
			<label>
				Email:
				<input type="email" bind:value={customerEmail} />
			</label>
			<label>
				Event Date:
				<input type="date" bind:value={eventDate} />
			</label>
			<label>
				Message:
				<textarea rows="3" bind:value={customerMessage}></textarea>
			</label>
			<div class="modal-actions">
				<button on:click={submitCallbackForm}>Submit</button>
				<button on:click={() => showModal = false}>Cancel</button>
			</div>
		</div>
	</div>
{/if}
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

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		width: 90%;
		max-width: 500px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}

	.modal h3 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: #2d3748;
	}

	.modal label {
		display: block;
		margin-bottom: 0.8rem;
		color: #4a5568;
		font-size: 0.9rem;
	}

	.modal input,
	.modal textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #cbd5e0;
		border-radius: 6px;
		margin-top: 0.25rem;
		font-size: 0.95rem;
	}

	.modal-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.modal-actions button:first-child {
		background-color: #3182ce;
		color: white;
	}

	.modal-actions button:last-child {
		background-color: #e2e8f0;
		color: #2d3748;
	}
</style>
