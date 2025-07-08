<script>
        export let data;
        import { supabase } from '$lib/supabaseClient.js';
        import { goto } from '$app/navigation';
        async function SignOut(){
            await supabase.auth.signOut()
            location.href="/vendors"
        }
</script>
<main>
    {#if data.vendor}
        <h2>Welcome {data.vendor.owner_name}</h2>
    {:else}
        <p>Error fetching the details!!!</p>
    {/if}
    <button on:click={SignOut}>logout!</button>
</main>