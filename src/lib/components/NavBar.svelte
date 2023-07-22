<script lang="ts">
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';

	$: user = $page.data.user;
</script>

<nav class="main-nav">
	<Logo --margin="0 0 0 10px" />

	<div class="btns">
		{#if user}
			<a href="/protected">Tasks</a>
		{:else}
			<a href="/signup">Sign Up</a>
			<a href="/login">Log In</a>
		{/if}
	</div>
</nav>

<style lang="scss">
	nav,
	div.btns {
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	nav {
		@include txt-title;

		background-color: rgba(19, 21, 25, 0.7);
		width: 100%;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 0;
		left: 50%;
		padding: 10px 0;
		transform: translateX(-50%);
		border-bottom: 1px solid $c-sec;
	}

	div.btns {
		a {
			cursor: pointer;
			border: 1px solid $c-sec;
			border-radius: 0;
			text-align: center;
			padding: 0.3rem;
			font-size: 1.2rem;
			transition: all 0.5s ease-in-out;
			background-color: $c-overlay;
			margin-right: 10px;

			&:hover {
				background-color: $c-hover;
			}
		}
	}
</style>
