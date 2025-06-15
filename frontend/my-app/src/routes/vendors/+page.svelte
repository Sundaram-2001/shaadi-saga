<script>
	import { supabase } from "$lib/supabaseClient";
	import { goto } from "$app/navigation";

	let rawPhoneNumber = '';
	let fullPhoneNumber = '';
	let otpCode = '';
	let otpSent = false;

	// sending otp
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

	// Step 2: otp verification and re-direct
	async function verifyOTP() {
		const { error } = await supabase.auth.verifyOtp({
			phone: fullPhoneNumber,
			token: otpCode,
			type: 'sms'
		});

		if (error) {
			alert("OTP verification failed: " + error.message);
			return;
		}

		
		const {
			data: { user },
			error: userError
		} = await supabase.auth.getUser();

		if (userError || !user) {
			alert("Failed to fetch user.");
			return;
		}

		
		const {
			data: { session },
			error: sessionError
		} = await supabase.auth.getSession();

		if (sessionError || !session) {
			alert("Failed to get session/token");
			return;
		}

		const token = session.access_token;

		
		localStorage.setItem('access_token', token);

		
		const { data: vendor, error: vendorError } = await supabase
			.from('vendors')
			.select('*')
			.eq('user_id', user.id)
			.maybeSingle();

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
