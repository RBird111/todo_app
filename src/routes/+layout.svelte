<script lang="ts">
	import '$lib/styles/app.scss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />
<div class="app-wrap">
	<slot />
</div>

<style lang="scss">
	.app-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid $c-sec;
		border-radius: 3px;
		padding: 0.6rem;
	}
</style>
