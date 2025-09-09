<script>
    export let data;
    import { goto } from '$app/navigation';

    // The `user` object will be null if they are not authenticated,
    // or contain user data if they are.
    const { user } = data;

    function handleExistingUser() {
        goto('/customer/dashboard');
    }

    function handleNewUser() {
        goto('/customer/createprofile');
    }
</script>

<main>
    <h1>Welcome to the App!</h1>
    
    {#if user}
        <h2>Welcome back!</h2>
        <p>What would you like to do?</p>
        <button on:click={handleExistingUser}>Go to Dashboard</button>
        <button on:click={handleNewUser}>Start Onboarding</button>
    {:else}
        <h2>Please log in or sign up.</h2>
        <a href="/customer/auth">Log in / Sign up</a>
    {/if}
</main>