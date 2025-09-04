<script>
    import { supabase } from "$lib/supabaseClient";
    import { error } from "@sveltejs/kit";
    let email=''
    let name=''
    let phone_number=''
    let errormessage=''
    let successmessage=''
    let loading=false;
    const redirecturl=`${window.location.origin}/vendors/createprofile`
    const signup=async()=>{
        loading=true
        errormessage=''
        const {data,error}=await supabase.auth.signInWithOtp({
            email,
            options:{
                emailRedirectTo:redirecturl,
                data:{
                    name,
                    phone_number
                }
            }
            
        })
        if(error){
            errormessage=error.message
            console.error(error)
        }
        else{
            successmessage="Awesome, Kindly check your email for next steps!"
        }
        loading=false
    }
</script>
<main>
    <h4>welcome, lets get you started!</h4>
    <form on:submit|preventDefault={signup}>
        <label for="name">Your Name:</label>
        <input type="text" name="name" bind:value={name} required/>
        <label for="email">Your Email:</label>
        <input type="email" name="email" bind:value={email} required/>
        <label for="phone_number">Your Mobile Number:</label>
        <input type="text" name="phone_number" bind:value={phone_number} required/>
        <button disabled={loading} type="submit">
            {#if loading}
                Submitting...
            {:else}
                Submit!
            {/if}
        </button>
    </form>
    {#if errormessage}
        <p style="color: red;">{errormessage}</p>
    {:else}
        <p style="color: green;">{successmessage}</p>
    {/if}
</main>