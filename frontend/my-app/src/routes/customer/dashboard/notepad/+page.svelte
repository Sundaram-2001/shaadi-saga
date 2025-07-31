<script>
	export let form;
	export let data;
</script>

<main>
	<form method="post">
		<textarea name="notes" id="notes" placeholder="Enter your notes here..."></textarea>
		<button type="submit">Save</button>
	</form>

	{#if form?.success}
		<p style="color: green;">{form.message}</p>
	{:else if form?.error}
		<p style="color: red;">{form.error}</p>
	{/if}

	<h3>Current notes</h3>

	{#if data.notes.length > 0}
		<ul>
			{#each data.notes as note}
				<li>{note.notes} <small>({new Date(note.created_at).toLocaleString()})</small></li>
			{/each}
		</ul>
	{:else}
		<p>No notes yet.</p>
	{/if}
</main>
