<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { get } from 'svelte/store';

	let vendorId: string = '';
	let access_token = '';
	let refresh_token = '';
	let customerName = '';
	let customerPhone = '';
    let email='';
	$: vendorId = get(page).params.vendorId;

	onMount(async () => {
		access_token = localStorage.getItem("access_token") || '';
		refresh_token = localStorage.getItem("refresh_token") || '';

		if (!access_token || !refresh_token) {
			alert("Kindly login to continue!");
			goto("/customer");
			return;
		}

		
		const { data, error } = await supabase.auth.setSession({
			access_token,
			refresh_token
		});

		if (error || !data.session) {
			alert("Session error, please login again.");
			goto("/customer");
			return;
		}
	});

	async function submitCallbackForm() {
		if (!customerName || !customerPhone || !email) {
			alert("Please enter your name, phone number, and email.");
			return;
		}

		try {
			const res = await fetch("http://localhost:3000/requestCallback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${access_token}`
				},
				body: JSON.stringify({
					vendor_id: vendorId,
					customer_name: customerName,
					customer_phone: customerPhone,
                    customer_email:email
				})
			});

			const result = await res.json();

			if (!res.ok) throw new Error(result.message || "Failed to request callback");

			alert(result.message)
			goto("/customer");
		} catch (err) {
			console.error("Callback error:", err);
			alert("Something went wrong.");
		}
	}
</script>

<main>
	<h2>Request a Callback</h2>
	<div class="form-container">
		<label>
			Name:
			<input type="text" bind:value={customerName} placeholder="Your Name" required/>
		</label>
		<label>
			Phone Number:
			<input type="tel" bind:value={customerPhone} placeholder="Your Phone" required/>
		</label>
        <label>
			Email Address:
			<input type="email" bind:value={email} placeholder="Your Email" required/>
		</label>
		<button on:click={submitCallbackForm}>Submit Request</button>
	</div>
</main>

<style>
	main {
		max-width: 500px;
		margin: 2rem auto;
		padding: 1.5rem;
		font-family: system-ui, sans-serif;
		background-color: #f7fafc;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	h2 {
		text-align: center;
		margin-bottom: 1.5rem;
		color: #2d3748;
	}

	.form-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		font-size: 0.95rem;
		color: #4a5568;
	}

	input {
		width: 100%;
		padding: 0.6rem;
		border: 1px solid #cbd5e0;
		border-radius: 6px;
		font-size: 1rem;
		margin-top: 0.25rem;
	}

	button {
		background-color: #3182ce;
		color: white;
		padding: 0.75rem;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		cursor: pointer;
		font-weight: bold;
	}

	button:hover {
		background-color: #2b6cb0;
	}
</style>
