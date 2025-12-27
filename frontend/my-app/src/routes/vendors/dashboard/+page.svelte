<script>
    import { supabase } from '$lib/supabaseClient.js';
    let logouterror = '';
    let isLoggingOut = false; 
    export let data;
    const { user, userDetails } = data;

    const signout = async () => {
        const { error: logoutError } = await supabase.auth.signOut();

        if (logoutError) {
            console.error(logoutError);
            logouterror = logoutError.message;
        } else {
            window.location.href='/'
        }
    };
</script>

<main>
    <h2>Welcome {userDetails.owner_name}!</h2>
    
    <p>Your Email: <strong>{userDetails.email}</strong></p>
    <footer>
        <button 
            on:click={signout}
            disabled={isLoggingOut}
        >
            {#if isLoggingOut}
                Logging out... ⏳
            {:else}
                Logout! 🚪
            {/if}
        </button>
        {#if logouterror}
            <p class="error-message">{logouterror}</p>
        {/if}
    </footer>
</main>

<style>
    .error-message {
        color: crimson;
        font-weight: bold;
    }
</style>