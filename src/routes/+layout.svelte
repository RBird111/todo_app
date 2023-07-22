<script lang="ts">
	import '$lib/styles/app.scss';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let visible = false;
	onMount(() => (visible = true));
</script>

<NavBar />
{#if visible}
	<div class="app-wrap" transition:fade={{ delay: 500, duration: 1500 }}>
		<slot />
	</div>
{/if}

<div class="background" />

<style lang="scss">
	.app-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.background {
		transform: scale(1);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: -10;
		filter: blur(0.2rem);
		transition: all 1s ease-in-out;

		&:before,
		&:after {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		&:before {
			transition: background-color $d-bg ease-in-out;
			transition-delay: $d-intro;
			background-image: linear-gradient(to top, $c-overlay, $c-overlay),
				url('overlay.png');
			background-size: auto, 256px 256px;
			background-position: center, center;
			background-repeat: no-repeat, repeat;
			z-index: -9;
		}

		&:after {
			transform: scale(1.125);
			transition: transform $d-content ease-in-out,
				filter $d-content ease-in-out;
			background-image: url('bg.jpg');
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			z-index: -10;
		}
	}
</style>
