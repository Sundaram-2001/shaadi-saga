<script>
	import { supabase } from "$lib/supabaseClient";
	import { goto } from "$app/navigation";

	let rawPhoneNumber = '';
	let fullPhoneNumber = '';
	let otpCode = '';
	let otpSent = false;

	async function loginWithOTP() {
		if (!/^\d{10}$/.test(rawPhoneNumber)) {
			alert('Enter a valid 10-digit phone number.');
			return;
		}

		fullPhoneNumber = `+91${rawPhoneNumber.trim()}`;

		const { error } = await supabase.auth.signInWithOtp({
			phone: fullPhoneNumber,
			options: {
				shouldCreateUser: true
			}
		});

		if (error) {
			alert("Error sending the OTP: " + error.message);
		} else {
			alert("OTP sent successfully!");
			otpSent = true;
		}
	}

	async function verifyOTP() {
		const { error: otpError } = await supabase.auth.verifyOtp({
			phone: fullPhoneNumber,
			token: otpCode,
			type: 'sms'
		});

		if (otpError) {
			alert("OTP verification failed: " + otpError.message);
			return;
		}

		// Ensure session is hydrated properly
		await new Promise((r) => setTimeout(r, 700)); // <- increased delay

		const { data: sessionResult, error: sessionError } = await supabase.auth.getSession();

		if (sessionError || !sessionResult?.session) {
			alert("Failed to fetch session");
			return;
		}

		const token = sessionResult.session.access_token;
		localStorage.setItem('access_token', token);

		const { data: userResult, error: userError } = await supabase.auth.getUser();

		if (userError || !userResult?.user) {
			alert("Failed to fetch user");
			return;
		}

		const userId = userResult.user.id;
		console.log("Logged in user ID:", userId);
		const { data: vendor, error: vendorError } = await supabase
			.from('vendors')
			.select('id, business_name')
			.eq('user_id', userId)
			.maybeSingle();

		console.log("Vendor profile result:", vendor);
		console.log("Vendor error (if any):", vendorError);

		if (vendorError) {
			alert("Vendor fetch error: " + vendorError.message);
			return;
		}

		if (vendor) {
			goto('/vendors/dashboard');
		} else {
			goto('/vendors/createprofile');
		}
	}
</script>

<main style="max-width: 400px; margin: auto; padding: 1rem;">
	<h2>Vendor Login</h2>

	{#if !otpSent}
		<input
			type="tel"
			bind:value={rawPhoneNumber}
			placeholder="Enter 10-digit phone number"
			style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;"
		/>
		<button on:click={loginWithOTP} style="width: 100%; padding: 0.5rem;">
			Send OTP
		</button>
	{:else}
		<input
			type="text"
			bind:value={otpCode}
			placeholder="Enter OTP"
			style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;"
		/>
		<button on:click={verifyOTP} style="width: 100%; padding: 0.5rem;">
			Verify OTP
		</button>
	{/if}
</main>
