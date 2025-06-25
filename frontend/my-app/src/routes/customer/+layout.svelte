<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let favourites = [];

	async function logout() {
		await supabase.auth.signOut();
		goto('/');
	}

	$: shouldShowNavbar = !$page.url.pathname.match(/^\/customer\/?$/);

	onMount(async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (user) {
			const { data, error } = await supabase
				.from('favourites')
				.select('vendor_id')
				.eq('user_id', user.id);

			if (error) {
				console.error('Failed to fetch favourites:', error);
				return;
			}

			favourites = data;
			console.log('User favourites:', favourites);
		}
	});

	function goToFavourites() {
		goto('/customer/favourites');
	}
</script>

{#if shouldShowNavbar}
	<div class="navbar">
		<button class="favourites-btn" on:click={goToFavourites}>⭐ Favourites</button>
		<button class="logout-btn" on:click={logout}>Logout</button>
	</div>
{/if}

<slot />

<style>
	.navbar {
		display: flex;
		justify-content: flex-end;
		padding: 1rem;
		background-color: #f9f9f9;
		border-bottom: 1px solid #ccc;
		gap: 1rem;
	}

	.logout-btn {
		background-color: #e53e3e;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
	}

	.favourites-btn {
		background-color: #ecc94b;
		color: #1a202c;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.375rem;
		cursor: pointer;
	}
</style>
