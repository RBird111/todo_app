<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
</script>

<div>
	<h1 style:font-size="2.5rem">Welcome to</h1>
	<Logo --font-size="2.1rem" />
</div>

<style lang="scss">
	div {
		// @include borders;

		display: flex;
		flex-flow: column wrap;
		align-items: center;
	}
</style>
