<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';

	$: user = $page.data.user;
</script>

<div class="wrap">
	{#if user}
		<h1>Welcome back {user.firstName}!</h1>
	{:else}
		<h1>Welcome to</h1>
		<Logo --font-size="1.8rem" --margin="0 0 1.5rem 0" active={false} />
		<i class="fa-solid fa-terminal" />
		<p class="body">
			The
			<span class="kinda-true">
				world's first<span class="disclaimer">*my first*</span>
			</span>
			note taking app for programmers
			<br /> that helps you do you!
		</p>
	{/if}
</div>

<style lang="scss">
	.wrap {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-content: center;
		background-image: radial-gradient(farthest-side, $c-overlay, transparent);
	}

	h1 {
		text-align: center;
	}

	i {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 3rem;
		width: 3rem;
		padding: 0.5rem;

		font-size: 1.5rem;

		margin-bottom: 1.5rem;
		border-radius: 100%;
		border: 1px solid $c-sec;
	}

	.body {
		font-size: 1.3rem;
		text-align: center;
	}

	.kinda-true {
		cursor: pointer;
		position: relative;
		text-decoration: underline dotted;

		&:hover > * {
			visibility: visible;
			opacity: 1;
		}
	}

	.disclaimer {
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s ease-in-out;
		position: absolute;
		top: -1.5rem;
		left: 50%;
		transform: translateX(-50%);
		padding: 0.2rem;
		width: max-content;
		background-color: $c-main;
		outline: 1px solid $c-sec;
		font-size: 1rem;
		font-weight: 400;
	}
</style>
