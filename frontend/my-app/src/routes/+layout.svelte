<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';

	// @ts-ignore
	/**
     * @type {import("@supabase/auth-js").User | null | undefined}
     */
	let user = null;

	onMount(async () => {
		const { data: { session } } = await supabase.auth.getSession();
		user = session?.user;

		// Optional: redirect to login if not logged in
		if (!user && $page.url.pathname !== '/') {
			goto('/');
		}
	});

	async function logout() {
		await supabase.auth.signOut();
		goto('/');
	}
</script>

<nav class="navbar">
	<a href="/home">Home</a>
	<a href="/settings">Settings</a>
	{#if user}
		<button on:click={logout}>Logout</button>
	{/if}
</nav>

<slot />

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #f8f9fa;
		border-bottom: 1px solid #ccc;
	}
	a {
		margin-right: 1rem;
		text-decoration: none;
		color: #333;
	}
	button {
		background-color: #dc2626;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
