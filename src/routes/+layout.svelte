<script lang="ts">
	import '$lib/styles/app.scss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />

<div class="app-wrap">
	<slot />
</div>

<div class="background" />

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

	.background {
		transform: scale(1.0);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: -10;
		filter: blur(0.2rem);

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
