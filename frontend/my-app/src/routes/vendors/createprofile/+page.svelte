<script>
	import { supabase } from '$lib/supabaseClient';
	import {goto} from '$app/navigation';
	let owner_name = '';
	let business_name = '';
	let locality = '';
	let email = '';
	let phone_number = '';
	let vendor_type = '';
	let loading = false;

	// @ts-ignore
	const handleSubmit = async (event) => {
		event.preventDefault();
		loading = true;

		const data = { business_name, locality, email, phone_number, vendor_type ,owner_name};
		console.log("Submitting:", data);

		try {
			const sessionResult = await supabase.auth.getSession();
			const access_token = sessionResult.data.session?.access_token;
			console.log("Access Token:", access_token);
			if (!access_token) {
				alert("You are not logged in. Please log in first.");
				loading = false;
				return;
			}

			const response = await fetch("http://localhost:3000/vendors", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${access_token}`
				},
				body: JSON.stringify(data)
			});

			let result;
			try {
				result = await response.json();
			} catch (err) {
				console.error("Invalid JSON from backend");
				alert("Unexpected error occurred.");
				return;
			}

			if (response.ok) {
				console.log("Vendor created successfully", result);
				alert("Vendor created successfully!");
				await goto('/vendors/dashboard');
			} else {
				console.error("Error creating vendor", result);
				alert("Error: " + (result?.error || "Something went wrong."));
			}
		} catch (error) {
			console.error("Request failed", error);
			alert("Something went wrong.");
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<h3>Welcome, let's get you onboard!</h3>
	<form on:submit={handleSubmit}>
		<label>
			Owner Name:
			<input type="text" name="owner_name" bind:value={owner_name} required />
		</label>
		<label>
			Business Name:
			<input type="text" name="business_name" bind:value={business_name} required />
		</label>

		<label>
			Locality:
			<input type="text" name="locality" bind:value={locality} required />
		</label>

		<label>
			Email:
			<input type="email" name="email" bind:value={email} />
		</label>

		<label>
			Phone Number:
			<input type="tel" name="phone" bind:value={phone_number} required />
		</label>

		<label for="vendor_type">Type of Vendor:</label>
		<select id="vendor_type" name="vendor_type" bind:value={vendor_type} required>
			<option value="" disabled>Select type</option>
			<option value="photographer">Photographer</option>
			<option value="caterer">Caterer</option>
			<option value="decorator">Decorator</option>
			<option value="venue">Venue</option>
			<option value="makeup_artist">Makeup Artist</option>
			<option value="dj">DJ</option>
			<option value="florist">Florist</option>
			<option value="mehendi">Mehendi</option>
			<option value="car_rental">Car Rental</option>
		</select>

		<button type="submit" disabled={loading}>
			{#if loading}Submitting...{/if}
			{#if !loading}Send{/if}
		</button>
	</form>
</main>
