<script>
    import { dev } from "$app/environment";
    import { supabase } from "$lib/supabaseClient";
    let email = '';
    let successmessage = '';
    let errormessage = '';
    let loading = false;

    const baseURL=dev  ? "http://localhost:5173"
    : "https://shaadi-saga.vercel.app";
    const login = async () => {
        loading = true;
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${baseURL}/vendors/home`
            }
        });

        if (error) {
            console.error(error);
            errormessage = error.message;
            successmessage = '';
        } else {
            successmessage = "Awesome, kindly check your email for next steps!";
            errormessage = '';
        }
        loading = false;
    };
</script>

<main>
    <h3>welcome back, kindly enter your email below to login</h3>
    <form on:submit|preventDefault={login}>
        <label for="email">Your Email:</label>
        <input type="email" name="email" bind:value={email} required />
        <button disabled={loading}>
            {#if loading}
                Submitting...
            {:else}
                Submit!
            {/if}
        </button>
    </form>

    {#if errormessage}
        <p style="color: red;">{errormessage}</p>
    {:else if successmessage}
        <p style="color: green;">{successmessage}</p>
    {/if}
</main>
