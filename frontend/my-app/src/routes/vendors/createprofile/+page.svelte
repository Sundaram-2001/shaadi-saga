<script>
    let owner_name = ''
    let business_name = ''
    let locality = ''
    let email = ''
    let phone_number = ''
    let vendor_type = ''

    let message = ''
    let error = ''
    let loading = false

    import { supabase } from "$lib/supabaseClient";

    const handleSubmit = async () => {
        // implement submission logic here
    }
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
            <select name="vendor_type" bind:value={vendor_type} required>
                <option value="">Select type</option>
                <option value="photographer">Photographer</option>
                <option value="caterer">Caterer</option>
                <option value="decorator">Decorator</option>
                <option value="venue">Venue</option>
                <option value="makeup_artist">Makeup Artist</option>
                <option value="dj">DJ</option>
                <option value="florist">Florist</option>
                <option value="mehendi">Mehendi</option>
                <option value="car_rental">Car Rental</option>
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