<script>
	export let form;
	let loading = false;
</script>

<main style="max-width: 600px; margin: 2rem auto; font-family: sans-serif; padding: 2rem; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); background-color: #fff;">
	<h2 style="text-align: center; margin-bottom: 1.5rem;">Welcome! Let’s get you onboard 🚀</h2>

	{#if form?.message}
		<p style="color: green; text-align: center; font-weight: 500;">{form.message}</p>
		<p style="text-align: center;"><a href="/vendors/dashboard" style="color: #0070f3; text-decoration: underline;">Go to your dashboard</a></p>
	{/if}

	{#if form?.error}
		<p style="color: red; text-align: center; font-weight: 500;">{form.error}</p>
	{/if}

	<form method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
		<label>
			<span>Owner Name</span>
			<input type="text" name="owner_name" required style="width: 100%; padding: 0.5rem;" />
		</label>

		<label>
			<span>Business Name</span>
			<input type="text" name="business_name" required style="width: 100%; padding: 0.5rem;" />
		</label>

		<label>
			<span>Locality</span>
			<input type="text" name="locality" required style="width: 100%; padding: 0.5rem;" />
		</label>

		<label>
			<span>Email</span>
			<input type="email" name="email" required style="width: 100%; padding: 0.5rem;" />
		</label>

		<label>
			<span>Phone Number</span>
			<input type="tel" name="phone" required style="width: 100%; padding: 0.5rem;" />
		</label>

		<label>
			<span>Type of Vendor</span>
			<select name="vendor_type" required style="width: 100%; padding: 0.5rem;">
				<option value="" disabled selected>Select type</option>
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
		</label>

		<button type="submit" disabled={loading} style="padding: 0.75rem; background-color: #0070f3; color: white; border: none; border-radius: 6px; cursor: pointer;">
			{#if loading}
				Submitting...
			{:else}
				Send
			{/if}
		</button>
	</form>
</main>
