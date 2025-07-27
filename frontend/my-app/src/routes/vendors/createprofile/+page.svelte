<script>
	export let form
	let loading = false;
</script>

<main>
	<h3>Welcome, let's get you onboard!</h3>
	{#if form?.message}
		<p style="color: green;">{form.message}</p>
	{/if}
	{#if form?.error}
		<p style="color: red;">{form.error}</p>
	{/if}
	<form method="POST">
		<label>
			Owner Name:
			<input type="text" name="owner_name" required />
		</label>
		<label>
			Business Name:
			<input type="text" name="business_name" required />
		</label>
		<label>
			Locality:
			<input type="text" name="locality" required />
		</label>
		<label>
			Email:
			<input type="email" name="email" required />
		</label>
		<label>
			Phone Number:
			<input type="tel" name="phone" required />
		</label>
		<label for="vendor_type">Type of Vendor:</label>
		<select id="vendor_type" name="vendor_type" required>
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

		<button type="submit" disabled={loading}>
			{#if loading}Submitting...{/if}
			{#if !loading}Send{/if}
		</button>
	</form>
</main>
