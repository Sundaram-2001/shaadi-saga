<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabaseClient';

  // Current route
  $: pathname = $page.url.pathname;

  // Routes where logout button should NOT appear
  const hideLogoutRoutes = [
    '/',
    '/customer',
    '/vendors',
    '/customer/auth',
    '/vendors/auth'
  ];

  // Determine logout visibility
  $: hideLogout = hideLogoutRoutes.includes(pathname);

  // Logout handler
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

<!-- Navbar always visible -->
<nav class="navbar">
  <!-- Brand -->
  <div class="brand">
    <a href="/">ShaadiSaga</a>
  </div>

  <!-- Actions -->
  <div class="actions">
    {#if !hideLogout}
      <button on:click={handleLogout} class="logout-btn">
        Logout
      </button>
    {/if}
  </div>
</nav>

<main>
  <slot />
</main>

<style>
  /* =========================
     Global Styles
     ========================= */
  :global(body) {
    margin: 0;
    font-family: 'Lato', sans-serif;
    background: #faf7f2;
    color: #1f2937;
  }

  /* =========================
     Navbar
     ========================= */
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

    transition: box-shadow 0.25s ease;
  }

  .navbar:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
  }

  /* =========================
     Brand
     ========================= */
  .brand a {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem;
    font-weight: 700;
    text-decoration: none;

    background: linear-gradient(135deg, #7a1f2b, #c0364c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    letter-spacing: -0.5px;
  }

  /* =========================
     Actions
     ========================= */
  .actions {
    display: flex;
    align-items: center;
    min-height: 40px; /* prevents layout shift */
  }

  /* =========================
     Logout Button
     ========================= */
  .logout-btn {
    padding: 0.55rem 1.6rem;
    border-radius: 999px;

    font-weight: 700;
    font-size: 0.9rem;

    background: white;
    color: #7a1f2b;

    border: 2px solid #7a1f2b;
    cursor: pointer;

    transition: all 0.25s ease;
  }

  .logout-btn:hover {
    background: #7a1f2b;
    border-color: #7a1f2b;
    color: white;

    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(122, 31, 43, 0.3);
  }

  /* =========================
     Main Wrapper
     ========================= */
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    min-height: calc(100vh - 80px);
  }

  /* =========================
     Responsive
     ========================= */
  @media (max-width: 640px) {
    .navbar {
      padding: 1rem 1.5rem;
    }

    .brand a {
      font-size: 1.6rem;
    }

    .logout-btn {
      padding: 0.45rem 1.2rem;
      font-size: 0.85rem;
    }
  }
</style>
