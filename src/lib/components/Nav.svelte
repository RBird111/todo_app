<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const nav = document.getElementsByClassName('main-nav')[0];
		const maxWidth = Object.values(nav.children).reduce((acc, n) => {
			const width = (n as HTMLElement).offsetWidth;
			return width > acc ? width : acc;
		}, 0);
		Object.values(nav.children).forEach(
			(ele) => ((ele as HTMLElement).style.width = `${maxWidth + 20}px`)
		);
	});

	const navElements = ['Home', 'Protected', 'Sign Up', 'Log In'];
	const getHref = (loc: string) => {
		if (loc === 'Home') {
			return '/';
		}
		return `/${loc.toLowerCase().split(' ').join('')}`;
	};
</script>

<nav class="main-nav">
	{#each navElements as loc}
		<a href={getHref(loc)}>
			{loc}
		</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		@include txt-title;

		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-color: transparent;

		a {
			cursor: pointer;
			border: 1px solid $c-sec;
			min-width: max-content;
			text-align: center;
			padding: 0.3rem;
			font-size: 1.2rem;
			transition: all 0.5s ease-in-out;
			background-color: $c-overlay;

			&:hover {
				background-color: $c-hover;
			}
		}
	}
</style>
