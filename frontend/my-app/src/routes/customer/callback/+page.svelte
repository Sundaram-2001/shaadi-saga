<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    let status = "Verifying your identity, kindly wait....";

    onMount(async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !sessionData.session) {
            console.error("No session found..");
            goto("/customer/auth");
            return;
        }

        const token = sessionData.session.access_token;

        try {
            const response = await fetch("http://localhost:3000/verifyCustomer", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });

            
            if (response.status === 401) {
                console.warn("Session not valid.."); 
                goto("/customer/auth");
                return;
            }

            if (!response.ok) throw new Error("Verification Failed");

            const result = await response.json();

            if (result.hasProfile) {
                status = "Redirecting to dashboard...";
                goto("/customer/dashboard");
            } else {
                status = "Redirecting to onboarding...";
                goto("/customer/createprofile");
            }

        } catch (err) {
            console.error(err);
            status = "Unexpected error, kindly go to the home page and retry!";
            setTimeout(() => goto("/customer"), 2000); 
        }
    });
</script>

<main>
    <div style="display: flex; justify-content: center; margin-top: 50px;">
        <h2>{status}</h2>
    </div>
</main>