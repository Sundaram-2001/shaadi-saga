<script>
// @ts-nocheck
	export let data;
	const { customer, userEvents, eventsError } = data;

	let daysLeft = null;

	const weddingDate = new Date(customer.date_of_wedding);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	weddingDate.setHours(0, 0, 0, 0);

	const diffInMs = weddingDate.getTime() - today.getTime();
	daysLeft = Math.round(diffInMs / (1000 * 60 * 60 * 24));

	function gotoMainPage() {
		window.location.href = '/customer/find';
	}
</script>

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
		Let's find your perfect vendors!
	</button>

	<h2 style="margin-top: 2rem;">📅 Your Wedding Timeline</h2>

	{#if userEvents.length > 0}
		<table>
			<thead>
				<tr>
					<th>Event</th>
					<th>Date</th>
					<th>Comments</th>
				</tr>
			</thead>
			<tbody>
				{#each userEvents as event}
					<tr>
						<td>{event.event_name}</td>
						<td>{new Date(event.event_date).toLocaleDateString()}</td>
						<td>{event.comments || '—'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p style="margin-top: 1rem; color: #777;">You haven’t added any events yet , <a href="/customer/dashboard/timeline">add here</a>.</p>
	{/if}
</main>

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

	table {
		width: 100%;
		max-width: 800px;
		border-collapse: collapse;
		margin-top: 1rem;
		font-size: 1rem;
	}

	th, td {
		padding: 0.75rem 1rem;
		border: 1px solid #ccc;
		text-align: left;
	}

	th {
		background-color: #f0f0f0;
		color: #333;
	}

	td {
		color: #555;
	}
</style>
