<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let access_token = '';
	let refresh_token = '';
	let showModal = false;
	let vendorId: string = '';
	let leads: Array<any> = [];
	let newStatus: string = '';
	$: shouldShowNavbar = !$page.url.pathname.match(/^\/vendors\/?$/);

	async function logout() {
		await supabase.auth.signOut();
		goto('/');
	}

	onMount(async () => {
		access_token = localStorage.getItem('access_token') ?? '';
		refresh_token = localStorage.getItem('refresh_token') ?? '';

		if (!access_token || !refresh_token) {
			alert("Kindly login to continue!");
			goto("/vendors");
			return;
		}

		const session = await supabase.auth.setSession({ access_token, refresh_token });
		const current_user = session.data.user;
		const v_id = current_user?.id;

		const { data, error } = await supabase
			.from("vendors")
			.select("id")
			.eq("user_id", v_id)
			.single();

		if (error) {
			console.error("Error fetching vendor:", error);
		} else {
			vendorId = data.id;
			console.log("Vendor ID:", vendorId);
		}
	});

	async function openCallbackModal() {
		console.log("Vendor ID before fetching leads:", vendorId);
		if (!vendorId) {
			alert("Vendor ID not loaded yet.");
			return;
		}

		const { data, error } = await supabase
			.from("leads")
			.select("id, name, phone_number, email, allow_whatsapp, status")
			.eq("vendor_id", vendorId);

		if (error) {
			console.error("Error fetching leads:", error);
			alert("Failed to fetch callback requests.");
			return;
		}

		leads = data;
		showModal = true;
	}

	function closeCallbackModal() {
		showModal = false;
	}

	async function updateLeadStatus(lead:any, newStatus: string) {
		const { error } = await supabase
			.from('leads')
			.update({ status: newStatus })
			// .eq('id', lead.id)
			.eq('vendor_id', vendorId);

		if (error) {
			alert('Error updating lead');
			console.error(error);
			return;
		}
		await fetch("http://localhost:3000/sendSMS",{
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				to: '+91' + lead.phone_number,
				message: `Hi ${lead.name}, your callback request has been ${newStatus}.`
			})
		})
		console.log("name", lead.name );
		await openCallbackModal();
	}
</script>

{#if shouldShowNavbar}
	<div class="navbar">
		<button class="favourites-btn" on:click={openCallbackModal} disabled={!vendorId}>Callback Requests</button>
		<button class="logout-btn" on:click={logout}>Logout</button>
	</div>
{/if}

{#if showModal}
	<div class="modal-overlay" on:click={closeCallbackModal}>
		<div class="modal-content" on:click|stopPropagation>
			<h2>Customer Callbacks</h2>
			{#if leads.length === 0}
				<p>No callback requests yet.</p>
			{:else}
				<ul>
					{#each leads as lead}
						<li class="lead-entry">
							<p><strong>Name:</strong> {lead.name}</p>
							<p><strong>Phone:</strong> {lead.phone_number}</p>
							<p><strong>Email:</strong> {lead.email}</p>
							<p><strong>WhatsApp Consent:</strong> {lead.allow_whatsapp ? '✅ Yes' : '❌ No'}</p>
							<p><strong>Status:</strong> {lead.status}</p>

							{#if lead.status === 'pending'}
								<button class="accept-btn" on:click={() => updateLeadStatus(lead, 'accepted')}>Accept</button>
								<button class="reject-btn" on:click={() => updateLeadStatus(lead, 'rejected')}>Reject</button>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
			<button class="close-btn" on:click={closeCallbackModal}>Close</button>
		</div>
	</div>
{/if}

<slot />

<style>
	.navbar {
		display: flex;
		justify-content: flex-end;
		padding: 1rem;
		background-color: #f9f9f9;
		border-bottom: 1px solid #ccc;
		gap: 1rem;
	}

	.logout-btn {
		background-color: #e53e3e;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
	}

	.favourites-btn {
		background-color: #ecc94b;
		color: #1a202c;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		min-width: 300px;
		max-width: 90%;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		text-align: left;
		max-height: 90vh;
		overflow-y: auto;
	}

	.lead-entry {
		border-bottom: 1px solid #ccc;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
	}

	.close-btn {
		margin-top: 1rem;
		background-color: #3182ce;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	.accept-btn {
		background-color: #38a169;
		color: white;
		margin-right: 0.5rem;
		padding: 0.4rem 0.8rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	.reject-btn {
		background-color: #e53e3e;
		color: white;
		padding: 0.4rem 0.8rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
</style>
