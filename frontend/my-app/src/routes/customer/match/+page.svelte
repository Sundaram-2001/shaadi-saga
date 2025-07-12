<script>
	import { goto } from '$app/navigation';

	export let data;
	const matchingVendors = data.vendors;

	function requestCallback(vendorId) {
		goto(`/customer/match/${vendorId}/requestCallback`);
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
							class="book-btn"
							on:click={() => requestCallback(vendor.id)}
						>
							📞 Request Callback
						</button>
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
		justify-content: center;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
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
