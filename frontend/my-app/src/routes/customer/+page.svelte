<script>
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let rawPhoneNumber = '';
	let fullPhoneNumber = '';
	let otpCode = '';
	let userData = null;
	let loading = true;
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
			alert('Error sending the OTP: ' + error.message);
		} else {
			alert('OTP sent successfully!');
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
			alert('OTP verification failed: ' + otpError.message);
			return;
		}

		const { data: sessionResult, error: sessionError } = await supabase.auth.getSession();
		if (sessionError || !sessionResult?.session) {
			alert('Failed to fetch session');
			return;
		}

		const { access_token, refresh_token } = sessionResult.session;
		localStorage.setItem('access_token', access_token);
		localStorage.setItem('refresh_token', refresh_token);

		const { data: userResult, error: userError } = await supabase.auth.getUser();
		if (userError || !userResult?.user) {
			alert('Could not fetch user!');
			return;
		}

		const userId = userResult.user.id;
		const { data: user, error: userFetchError } = await supabase
			.from('users')
			.select('*')
			.eq('id', userId)
			.single();

		if(!user){
            goto('/customer/createprofile');
        }else{
            goto('/customer/dashboard');
        }
	}
</script>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: #fdfcfa;
	}
	.card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		font-size: 1rem;
	}
	button {
		padding: 0.75rem;
		background-color: #0099ff;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: bold;
	}
	button:hover {
		background-color: #007acc;
	}
</style>

<main>
	<div class="card">
		<h2>Login with Phone</h2>

		{#if !otpSent}
			<input
				type="text"
				placeholder="Enter your phone number"
				bind:value={rawPhoneNumber}
				maxlength="10"
			/>
			<button on:click|preventDefault={loginWithOTP}>Send OTP</button>
		{:else}
			<input
				type="text"
				placeholder="Enter OTP"
				bind:value={otpCode}
				maxlength="6"
			/>
			<button on:click|preventDefault={verifyOTP}>Verify OTP</button>
		{/if}
	</div>
</main>
