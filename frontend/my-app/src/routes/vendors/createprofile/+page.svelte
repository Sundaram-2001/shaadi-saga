<script>
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

		const data = { business_name, locality, email, phone_number, vendor_type };
		console.log("Submitting:", data);

		try {
			const response = await fetch("http://localhost:3000/vendors", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			const result = await response.json();

			if (response.ok) {
				console.log("Vendor created successfully", result);
				alert("Vendor created successfully!");
				window.location.href = "/vendors/dashboard";
			} else {
				console.error("Error creating vendor", result);
				alert("Error creating vendor: " + result.message);
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
