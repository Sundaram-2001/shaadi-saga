<script>
    import { supabase } from "$lib/supabaseClient";

    export let data;

    let owner_name = ''
    let business_name = ''
    let locality = ''
    let email = ''
    let phone_number = ''
    let vendor_type = '' // FIXED: Added empty string value
    
    // UI State
    let message = ''
    let error = ''
    let loading = false

    const handleSubmit = async () => {
        loading = true
        error = ''
        message = ''

        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
            
            if (sessionError || !sessionData.session) {
                error = 'Please log in to submit details.'
                loading = false
                return
            }

            const token = sessionData.session.access_token

            // FIXED: Added the closing '}' here
            const payload = {
                owner_name,
                business_name,
                locality,
                email,
                phone_number,
                vendor_type 
            } 

            const result = await fetch("http://localhost:3000/vendors/createprofile", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload) 
            })

            const response = await result.json()

            if (result.ok) {
                message = 'Profile created successfully!'
                // Optional: Clear form
                // owner_name = ''; business_name = ''; ...
            } else {
                error = response.message || "Failed to create profile."
                console.error('API Error:', error)
            }

        } catch (err) {
            console.error(err)
            error = "Unexpected error. Please check your connection."
        } finally {
            loading = false
        }
    }
    // FIXED: Removed the extra '}' that was here
</script>

<main>
    <h2>Welcome! Let’s get you onboard 🚀</h2>

    {#if message}
        <p class="success">{message}</p>
        <p><a href="/vendors/dashboard">Go to your dashboard</a></p>
    {/if}

    {#if error}
        <p class="error">{error}</p>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <label>
            <span>Owner Name</span>
            <input type="text" name="owner_name" bind:value={owner_name} required />
        </label>

        <label>
            <span>Business Name</span>
            <input type="text" name="business_name" bind:value={business_name} required />
        </label>

        <label>
            <span>Locality</span>
            <input type="text" name="locality" bind:value={locality} required />
        </label>

        <label>
            <span>Email</span>
            <input type="email" name="email" bind:value={email} required />
        </label>

        <label>
            <span>Phone Number</span>
            <input type="tel" name="phone" bind:value={phone_number} required />
        </label>

        <label>
            <span>Type of Vendor</span>
            
            <select name="vendor_type" bind:value={vendor_type} required style={data.error ? "border-color: red;" : ""}>
                
                {#if data.error}
                    <option value="" disabled selected>{data.error}</option>
                
                {:else}
                    <option value="" disabled selected>Select type</option>
                    
                    {#if data.vendorTypes && data.vendorTypes.length > 0}
                        {#each data.vendorTypes as type}
                            <option value={type.id}>{type.name}</option> 
                        {/each}
                    {:else}
                         <option disabled>No categories found</option>
                    {/if}
                {/if}

            </select>
        </label>

        <button type="submit" disabled={loading}>
            {#if loading}
                Submitting...
            {:else}
                Send
            {/if}
        </button>
    </form>
</main>

<style>
    main {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        font-family: sans-serif;
    }

    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input, select {
        width: 100%;
        padding: 0.5rem;
    }

    button {
        padding: 0.75rem;
        background: #0070f3;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .success {
        color: green;
        text-align: center;
        font-weight: 500;
    }

    .error {
        color: red;
        text-align: center;
        font-weight: 500;
    }

    a {
        color: #0070f3;
        text-decoration: underline;
        text-align: center;
        display: block;
    }
</style>