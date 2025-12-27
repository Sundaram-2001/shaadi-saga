<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabaseClient';

  $: pathname = $page.url.pathname;

  
  const hideNavbarRoutes = [
    '/',
    '/customer',
    '/vendors',
    '/vendors/auth',
    '/customer/auth'
  ];

  // Hide navbar for exact matches or any auth route
  $: hideNavbar =
    hideNavbarRoutes.includes(pathname) ||
    pathname.startsWith('/auth');

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      goto('/');
    } catch (err) {
      console.error('Error logging out:', err.message);
    }
  };
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{#if !hideNavbar}
  <nav class="navbar">
    <div class="brand">
      <a href="/">ShaadiSaga</a>
    </div>

    <div class="actions">
      <button on:click={handleLogout} class="logout-btn">
        Logout
      </button>
    </div>
  </nav>
{/if}

<main>
  <slot />
</main>

<style>
  /* Global */
  :global(body) {
    margin: 0;
    font-family: 'Lato', sans-serif;
    background: #fafafa;
    color: #1f2937;
  }

  /* Navbar container */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 50;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem 2.5rem;

    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);

    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.03);

    transition: all 0.25s ease;
  }

  /* Brand */
  .brand a {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem;
    font-weight: 700;
    text-decoration: none;

    background: linear-gradient(135deg, #e11d48, #fb7185);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    letter-spacing: -0.5px;
  }

  /* Actions */
  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  /* Logout button */
  .logout-btn {
    padding: 0.55rem 1.6rem;
    border-radius: 999px;

    font-weight: 700;
    font-size: 0.9rem;

    background: white;
    color: #e11d48;

    border: 2px solid #e11d48;
    cursor: pointer;

    transition: all 0.25s ease;
  }

  /* Hover effect */
  .logout-btn:hover {
    background: #e11d48;
    color: white;

    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(225, 29, 72, 0.35);
  }

  /* Main content wrapper */
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    min-height: calc(100vh - 80px);
  }
</style>
