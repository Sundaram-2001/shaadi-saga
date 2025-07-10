<script>
// @ts-nocheck
	export let data;
	let customer = data.customer;

	let daysLeft = null;

	// Calculate days left
	const weddingDate = new Date(customer.date_of_wedding);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	weddingDate.setHours(0, 0, 0, 0);

	const millisecondsPerDay = 1000 * 60 * 60 * 24;
	const diffInMs = weddingDate.getTime() - today.getTime();
	daysLeft = Math.round(diffInMs / millisecondsPerDay);

	function gotoMainPage() {
		window.location.href = '/customer/find';
	}

	async function logout() {
		await fetch('/auth/logout', { method: 'POST' }); // Optional: you can handle signout from a route
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		window.location.href = '/auth'; // or '/customer' if that's your login route
	}
</script>

<style>
	main {
		padding: 2rem;
		font-family: Arial, sans-serif;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.welcome {
		font-size: 1.5rem;
		color: #333;
		margin-bottom: 1rem;
	}

	.name {
		color: #e91e63;
		font-weight: bold;
	}

	.wedding-info {
		font-size: 1.2rem;
		color: #555;
		margin-bottom: 2rem;
	}

	button.logout {
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #e91e63;
		color: white;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	button.logout:hover {
		background-color: #d81b60;
	}
</style>

<main>
	<p class="welcome">
		Welcome to Shaadi Saga, <span class="name">{customer.name}</span>!
	</p>

	{#if daysLeft > 0}
		<p class="wedding-info">💍 {daysLeft} days left until your big day!</p>
	{:else if daysLeft === 0}
		<p class="wedding-info">🎉 It's your wedding day! Congratulations! 🎉</p>
	{:else}
		<p class="wedding-info">❤️ You got married {Math.abs(daysLeft)} days ago.</p>
	{/if}

	<button class="logout" on:click={gotoMainPage}>
		Let's find you perfect vendors for your big day!
	</button>
	<button class="logout" on:click={logout}>Logout</button>
</main>
