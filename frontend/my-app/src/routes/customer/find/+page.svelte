<script>
// @ts-nocheck
	import { goto } from "$app/navigation";
	let vendor = "";
	let area = "";
	let loading = false;
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = { vendor, area };
		loading = true;
		goto(`/customer/match?vendor=${encodeURIComponent(vendor)}&area=${encodeURIComponent(area)}`);
	}
</script>

<main>
	<section class="welcome">
		<h1>Let’s Get Started!</h1>
		<p>Your dream wedding starts with the right team.  
		Tell us what you're looking for, and we'll help match you with the perfect vendors. 💍</p>
	</section>

	<section class="form-section">
		<div class="form-group">
			<label for="vendor">What kind of vendor are you looking for?</label>
			<select bind:value={vendor} id="vendor" required>
				<option value="" disabled >Select a vendor category</option>
				<option>Photographer</option>
				<option>Caterer</option>
				<option>Florists</option>
				<option>car_rental</option>
				<option>Decorator</option>
				<option>Venue</option>
				<option>DJ</option>
				<option>Props</option>
				<option>Mocktail/Bar</option>
				<option>Mehendi</option>
				<option>Makeup Artist</option>
			</select>
		</div>

		<div class="form-group">
			<label for="area">Where do you want the service?</label>
			<select bind:value={area} id="area" required>
				<option value="" disabled >Select an area / location</option>
				<option value="any">Any Area</option>
				<option>Banjara Hills</option>
				<option>Hitec City</option>
				<option>Gachibowli</option>
				<option>Jubilee Hills</option>
				<option>Old City</option>
				<option>kalimandir</option>
				<option>Narsingi</option>
				<option>Lingampally</option>
				<option>Kondapur</option>
			</select>
		</div>

		<button class="submit-btn" on:click={handleSubmit} disabled={loading}>
	{#if loading}
		<span>Finding vendors...</span>	
	{:else}
		<span>Find Vendors</span>
	{/if}
</button>
	</section>
</main>

<style>
	main {
		padding: 2rem;
		font-family: 'Segoe UI', sans-serif;
		color: #333;
		background-color: #f9f7f5;
		min-height: 100vh;
	}

	.welcome {
		max-width: 700px;
		margin: 0 auto 2rem auto;
		text-align: center;
	}

	h1 {
		font-size: 2.2rem;
		color: #e91e63;
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #555;
	}

	.form-section {
		max-width: 600px;
		margin: 0 auto;
		background: #fff;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
	}

	.form-group {
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
	}

	label {
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	select {
		padding: 0.75rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		font-size: 1rem;
	}

	.submit-btn {
		width: 100%;
		padding: 0.9rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #e91e63;
		color: white;
		font-weight: bold;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.2s ease;
		margin-top: 1rem;
	}

	.submit-btn[disabled] {
	background-color: #ccc;
	cursor: not-allowed;
}
</style>
