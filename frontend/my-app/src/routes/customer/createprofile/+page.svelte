<script>
	import { goto } from '$app/navigation';
	let name = '';
	let email = '';
	let phone_number = '';
	let country_code = '+91';
	let date_of_wedding = '';
	let area = '';
</script>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #f9f7f5;
	}

	.card {
		background-color: #fff;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
		width: 100%;
		max-width: 500px;
		text-align: center;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: #e91e63;
	}

	p {
		margin-bottom: 2rem;
		color: #555;
	}

	input,
	select,
	button {
		width: 100%;
		padding: 0.75rem;
		margin: 0.5rem 0;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		font-size: 1rem;
	}

	button {
		background-color: #e91e63;
		color: white;
		font-weight: bold;
		cursor: pointer;
		border: none;
	}

	button:hover {
		background-color: #d81b60;
	}

	.logout-button {
		background-color: #757575;
		margin-top: 1rem;
	}

	.logout-button:hover {
		background-color: #616161;
	}
</style>

<main>
	<div class="card">
		<h1>Welcome to Shaadi Saga 💍</h1>
		<p>Let's get to know you better! Fill in your wedding details below to get started.</p>

		<form method="POST">
			<input type="text" name="name" placeholder="Your Full Name" bind:value={name} required />
			<input type="email" name="email" placeholder="Email Address" bind:value={email} required />
			<input type="text" name="phone_number" placeholder="Phone Number (10 digits)" maxlength="10" bind:value={phone_number} required />
			<input type="hidden" name="country_code" value={country_code} />
			<input type="date" name="date_of_wedding" bind:value={date_of_wedding} required />

			<select name="area" bind:value={area} required>
				<option value="" disabled selected>Select Area / Location</option>
				<option>Banjara Hills</option>
				<option>Hitec City</option>
				<option>Gachibowli</option>
				<option>Jubilee Hills</option>
				<option>Old City</option>
				<option>KaliMandir</option>
				<option>Narsingi</option>
				<option>Lingampally</option>
				<option>Kondapur</option>
			</select>

			<button type="submit">Create My Profile</button>
		</form>

		<button on:click={async () => {
			const { error } = await supabase.auth.signOut();
			if (!error) goto('/');
		}} class="logout-button">Log Out</button>
	</div>
</main>