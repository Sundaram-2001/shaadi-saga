<script>
    import { supabase } from "$lib/supabaseClient";

    let email = '';
    let name = '';
    let phone_number = '';
    
    let loading = false;
    let successMessage = '';
    let errorMessage = '';

    const authenticate = async () => {
        loading = true;
        successMessage = '';
        errorMessage = '';
        
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/vendors/callback`,
                data: {
                    name,
                    phone_number
                }
            }
        });
        
        if (error) {
            console.error("Authentication Error:", error);
            errorMessage = error.message;
        } else {
            successMessage = "Awesome! Kindly check your email for the next steps.";
        }
        
        loading = false;
    };
</script>

<main>
    <h2>Join ShaadiSaga</h2>
    <p>Enter your details to get started finding customers for your business!</p>

    <form on:submit|preventDefault={authenticate}>
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" required bind:value={name}/>
        
        <label for="email">Your Email:</label>
        <input type="email" id="email" name="email" required bind:value={email}/>
        
        <label for="phone_number">Your Phone Number:</label>
        <input type="tel" id="phone_number" name="phone_number" required bind:value={phone_number}/>
        
        <button disabled={loading} type="submit">
            {#if loading}
                Submitting...
            {:else}
                Submit
            {/if}   
        </button>

        {#if successMessage}
            <p style="color: green;">{successMessage}</p>
        {/if}
        
        {#if errorMessage}
            <p style="color: red;">{errorMessage}</p>
        {/if}
    </form>
</main>