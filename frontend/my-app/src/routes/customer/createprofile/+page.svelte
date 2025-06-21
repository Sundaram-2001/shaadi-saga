<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";

	let name = '';
	let email = '';
	// @ts-ignore
	let country_code = '+91';
    let phone_number = '';
	let date_of_wedding = '';
	let area = '';
    // @ts-ignore
    let loading = false;

	// @ts-ignore
	const handleSubmit = async (event) => {
        event.preventDefault();
        loading = true;

        const fullPhoneNumber = `${country_code}${phone_number.trim()}`;
        const data = { name, email, date_of_wedding, area, fullPhoneNumber };
        console.log("Form data to be sent:", data);

        try {
            const session = await supabase.auth.getSession();
            const access_token = session.data.session?.access_token;

            if (!access_token) {
                alert("You are not logged in. Please log in first.");
                loading = false;
                goto('/customer');
                return;
            }

            const response = await fetch("http://localhost:3000/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify(data)
            });

            let result;
            try {
                result = await response.json();
            } catch (error) {
                console.error("Error occurred while parsing JSON", error);
                alert("Unexpected error occurred.");
                return;
            }

            if (response.ok) {
                alert("Profile created successfully!");
                await goto('/customer/dashboard');
            } else {
                console.error("Error creating vendor", result);
                alert("Error: " + (result?.error || "Something went wrong."));
            }
        } catch (error) {
            console.error("Request failed", error);
            alert("Something went wrong.");
        } finally {
            loading = false;
        }
    };

	
	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Logout failed:", error);
			alert("Logout failed. Please try again.");
			return;
		}
		localStorage.removeItem('access_token'); // if you store tokens
		goto('/'); // Redirect to homepage or login page
	}
</script>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #f9f7f5;
	}

	.card {
		background-color: #fff;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
		width: 100%;
		max-width: 500px;
		text-align: center;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: #e91e63;
	}

	p {
		margin-bottom: 2rem;
		color: #555;
	}

	input,
	select,
	button {
		width: 100%;
		padding: 0.75rem;
		margin: 0.5rem 0;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		font-size: 1rem;
	}

	button {
		background-color: #e91e63;
		color: white;
		font-weight: bold;
		cursor: pointer;
		border: none;
	}

	button:hover {
		background-color: #d81b60;
	}

	.logout-button {
		background-color: #757575;
		margin-top: 1rem;
	}

	.logout-button:hover {
		background-color: #616161;
	}
</style>

<main>
	<div class="card">
		<h1>Welcome to Shaadi Saga 💍</h1>
		<p>Let's get to know you better! Fill in your wedding details below to get started.</p>

		<form on:submit|preventDefault={handleSubmit}>
			<input type="text" placeholder="Your Full Name" bind:value={name} required />
			<input type="email" placeholder="Email Address" bind:value={email} required />
			<input type="text" placeholder="Phone Number (10 digits)" bind:value={phone_number} maxlength="10" required />
			<input type="date" placeholder="Wedding Date" bind:value={date_of_wedding} required />
			
			<select bind:value={area} required>
				<option value="" disabled selected>Select Area / Location</option>
				<option>Banjara Hills</option>
				<option>Hitec City</option>
				<option>Gachibowli</option>
				<option>Jubilee Hills</option>
				<option>Old City</option>
				<option>KaliMandir</option>
				<option>Narsingi</option>
				<option>Lingampally</option>
				<option>Kondapur</option>
			</select>

			<button type="submit">Create My Profile</button>
		</form>

		<button on:click={signOut} class="logout-button">
			Log Out
		</button>
	</div>
</main>
