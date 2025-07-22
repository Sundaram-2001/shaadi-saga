<script>
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;600&display=swap');

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 2rem;
		background: linear-gradient(to bottom right, #fff5f7, #ffe4e6);
		font-family: 'Inter', sans-serif;
		text-align: center;
	}

	h1 {
		font-family: 'Playfair Display', serif;
		font-size: 3rem;
		color: #b91c1c; /* Wedding red */
		margin-bottom: 0.2rem;
		letter-spacing: 1px;
	}

	h2 {
		font-size: 1.4rem;
		color: #7f1d1d;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	p {
		font-size: 1.1rem;
		color: #4b5563;
		margin-bottom: 2rem;
		max-width: 400px;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 250px;
	}

	a {
		text-decoration: none;
		background-color: #be123c;
		color: white;
		padding: 0.9rem 1.5rem;
		border-radius: 12px;
		font-weight: bold;
		font-size: 1rem;
		transition: transform 0.2s ease, background-color 0.3s ease;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	a:hover {
		background-color: #9f1239;
		transform: scale(1.05);
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2.2rem;
		}
		h2 {
			font-size: 1.2rem;
		}
		p {
			font-size: 1rem;
		}
	}
</style>

<main>
	<h1>Shaadi Saga</h1>
	<h2>Your Wedding, Our Promise</h2>
	<p>From venues to dhol walas — find and book everything for your big day with ease and elegance.</p>

	<div class="buttons">
		<a href="/vendors">Continue as a Vendor</a>
		<a href="/customer">Continue as a Customer</a>
	</div>
</main>
