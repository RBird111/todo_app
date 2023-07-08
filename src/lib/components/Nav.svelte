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

	const navElements = ['Home', 'Nav Bar', 'More Nav Stuff', 'Ibid'];
</script>

<nav class="main-nav">
	{#each navElements as ele}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<p on:click={(e) => console.log('You clicked =>', e.target)}>{ele}</p>
	{/each}
</nav>

<style lang="scss">
	nav {
		@include txt-title;

		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		p {
			cursor: pointer;
			border: 1px solid $c-sec;
			min-width: max-content;
			text-align: center;
			padding: 0.3rem;
			font-size: 1.2rem;

			&:hover {
				background-color: $c-hover;
			}
		}
	}
</style>
