<script>
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

  :root {
    --primary: #be123c;
    --primary-dark: #9f1239;
    --secondary: #7f1d1d;
    --bg-start: #fff5f7;
    --bg-end: #ffe4e6;
    --text-main: #1f2937;
    --text-muted: #6b7280;
  }

  main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem;
    background: linear-gradient(135deg, var(--bg-start), var(--bg-end));
    font-family: 'Inter', sans-serif;
  }

  .container {
    max-width: 520px;
    text-align: center;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    border-radius: 24px;
    padding: 3rem 2.5rem;

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3.2rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.4rem;
    letter-spacing: 0.5px;
  }

  h2 {
    font-size: 1.35rem;
    color: var(--secondary);
    margin-bottom: 1.2rem;
    font-weight: 500;
  }

  p {
    font-size: 1.05rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    text-decoration: none;
    padding: 0.9rem 1.5rem;
    border-radius: 14px;
    font-weight: 600;
    font-size: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.25s ease;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary), #fb7185);
    color: white;
    box-shadow: 0 8px 20px rgba(190, 18, 60, 0.35);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(190, 18, 60, 0.45);
  }

  .btn-secondary {
    background: white;
    color: var(--primary);
    border: 2px solid var(--primary);
  }

  .btn-secondary:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.4rem;
    }

    h2 {
      font-size: 1.15rem;
    }

    .container {
      padding: 2.2rem 1.8rem;
    }
  }
</style>

<main>
  <div class="container">
    <h1>ShaadiSaga</h1>
    <h2>Your Wedding, Our Promise</h2>

    <p>
      From venues to dhol walas — discover, compare, and book everything
      for your big day with ease and elegance.
    </p>

    <div class="buttons">
      <a href="/customer" class="btn btn-primary">
        Continue as a Customer
      </a>
      <a href="/vendors" class="btn btn-secondary">
        Continue as a Vendor
      </a>
    </div>
  </div>
</main>
