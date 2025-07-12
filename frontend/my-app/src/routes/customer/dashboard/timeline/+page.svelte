<script>
	// No JS needed here for now since form submission is handled by +page.server.js
</script>

<main>
	<h2>Add a Wedding Event</h2>
	<form action="/customer/dashboard/timeline" method="POST">
		<div class="form-group">
			<label for="event_name">Event Name</label>
			<input type="text" name="event_name" id="event_name" placeholder="e.g. Mehendi Ceremony" required />
		</div>

		<div class="form-group">
			<label for="event_date">Event Date</label>
			<input type="date" name="event_date" id="event_date" required />
		</div>

		<div class="form-group">
			<label for="comments">Comments (optional)</label>
			<textarea name="comments" id="comments" placeholder="Add any special instructions or notes..."></textarea>
		</div>

		<button type="submit">Add Event</button>
	</form>
</main>

<style>
	main {
		padding: 2rem;
		max-width: 600px;
		margin: 0 auto;
		font-family: Arial, sans-serif;
	}

	h2 {
		text-align: center;
		color: #e91e63;
		margin-bottom: 1.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.5rem;
		font-weight: bold;
		color: #333;
	}

	input, textarea {
		padding: 0.75rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		font-size: 1rem;
	}

	textarea {
		min-height: 100px;
	}

	button {
		padding: 0.8rem;
		background-color: #e91e63;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	button:hover {
		background-color: #d81b60;
	}
</style>
