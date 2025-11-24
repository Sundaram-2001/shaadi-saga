<script>
    import { onMount } from 'svelte'; 
    import { goto } from '$app/navigation'; 
    import { supabase } from "$lib/supabaseClient";

    let status = "Verifying, kindly wait...";

    onMount(async () => {
        
        //fetching the session 
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
            console.error("No session found");
            goto('/vendors/auth'); 
            return;
        }

        const token = sessionData.session.access_token;

        try {
            const response = await fetch("http://localhost:3000/verifyuser", { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });

            if (!response.ok) throw new Error("Verification failed");

            const result = await response.json();

            
            if (result.hasProfile) {
                status = "Redirecting to Dashboard...";
                goto('/vendors/dashboard');
            } else {
                status = "Redirecting to Onboarding...";
                goto('/vendors/createprofile');
            }

        } catch (err) {
            console.error(err);
            status = "Error verifying user. Please refresh.";
        }
    });
</script>

<main>
    <h2>{status}</h2>
    </main>