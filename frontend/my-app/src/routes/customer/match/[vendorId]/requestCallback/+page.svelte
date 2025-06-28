<script lang="ts">
	import { supabase } from "$lib/supabaseClient";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { get } from 'svelte/store';

	let vendorId: string = '';
	let allowWhatsaApp= false;
	let access_token = '';
	let refresh_token = '';
	let name = '';
	let phone_number = '';
    let email='';
	$: vendor_id = get(page).params.vendorId;

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
		if (!name || !phone_number || !email) {
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
					vendor_id,
					name,
					phone_number,
					email,
					allowWhatsaApp
				})
			});
			// console.log()
			const result = await res.json();

			if (!res.ok) throw new Error(result.message || "Failed to request callback");

			alert(result.message)
		} catch (err) {
			console.error("Callback error:", err);
			alert(err);
		}
	}
</script>

<main>
	<h2>Request a Callback</h2>
	<div class="form-container">
		<label>
			Name:
			<input type="text" bind:value={name} placeholder="Your Name" required/>
		</label>
		<label>
			Phone Number:
			<input type="tel" bind:value={phone_number} placeholder="Your Phone" required/>
		</label>
        <label>
			Email Address:
			<input type="email" bind:value={email} placeholder="Your Email" required/>
		</label>
		<label class="checkbox-label">
			<input type="checkbox" bind:checked={allowWhatsaApp} />
			<span>I allow this vendor to contact me on WhatsApp.</span>
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
.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
		color: #4a5568;
		cursor: pointer;
		user-select: none;
	}

	.checkbox-label input[type="checkbox"] {
		width: 1rem;
		height: 1rem;
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
