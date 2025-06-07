<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

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

		const { data, error } = await supabase.auth.signInWithOtp({
			phone: fullPhoneNumber,
			options: {
				shouldCreateUser: false
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
		const { data, error } = await supabase.auth.verifyOtp({
			phone: fullPhoneNumber,
			token: otpCode,
			type: 'sms'
		});

		if (error) {
			alert('Error verifying OTP: ' + error.message);
		} else {
			alert('Logged in successfully!');
			goto('/home'); 
		}
	}
</script>

<style>
	main {
		max-width: 400px;
		margin: 5rem auto;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		font-family: sans-serif;
	}

	h1 {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		margin: 0.5rem 0 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		font-size: 1rem;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: #1d4ed8;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #2563eb;
	}
</style>

<main>
	<h1>Login with OTP</h1>

	{#if !otpSent}
		<label for="phone">Phone Number (India):</label>
		<div style="display: flex; gap: 0.5rem; align-items: center;">
			<span>+91</span>
			<input
				id="phone"
				type="tel"
				bind:value={rawPhoneNumber}
				placeholder="Enter 10-digit phone number"
				maxlength="10"
			/>
		</div>
		<button on:click={loginWithOTP}>Send OTP</button>
	{:else}
		<label for="otp">Enter OTP:</label>
		<input
			id="otp"
			type="text"
			bind:value={otpCode}
			placeholder="Enter the OTP"
			maxlength="6"
		/>
		<button on:click={verifyOTP}>Verify OTP</button>
	{/if}
</main>