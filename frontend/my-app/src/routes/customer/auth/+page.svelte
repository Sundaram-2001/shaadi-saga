<script>
    import { supabase } from "$lib/supabaseClient";
    let name = '';
    let email = '';
    let phone_number = '';
    let successmsg = '';
    let errormsg = '';
    let loading = false;

    const authenticate = async () => {
        errormsg = '';
        successmsg = '';
        loading = true;

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/customers/home`,
                data:{
                    name,phone_number
                }
            }
        });

        if (error) {
            errormsg = error.message;
            console.error(error);
        } else {
            successmsg = "Awesome, kindly check your email for the magic link!";
        }

        loading = false;
    };
</script>

<main>
    <form on:submit|preventDefault={authenticate}>
        <label for="name">Your Name:</label>
        <input type="text" required name="name" bind:value={name}/>

        <label for="email">Your Email:</label>
        <input type="email" required name="email" bind:value={email}/>

        <label for="phone_number">Your Mobile Number:</label>
        <input type="text" required name="phone_number" bind:value={phone_number}/>

        <button type="submit" disabled={loading}>
            {#if loading}
                Submitting.. ⏳
            {:else}
                Submit! ✨
            {/if}
        </button>
    </form>
    
    {#if successmsg}
        <p class="success">{successmsg}</p>
    {/if}

    {#if errormsg}
        <p class="error">{errormsg}</p>
    {/if}
</main>

<style>
    .success {
        color: green;
        font-weight: bold;
    }
    .error {
        color: crimson;
        font-weight: bold;
    }
</style>