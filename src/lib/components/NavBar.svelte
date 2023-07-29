<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Logo from './Logo.svelte';

	$: user = $page.data.user;

	let icon_text: HTMLElement;
	const mouseEnter = () => (icon_text.style.opacity = '1');
	const mouseLeave = () => (icon_text.style.opacity = '0');
</script>

<nav class="main-nav">
	<Logo --margin="0 0 0 10px" />

	<div class="btns">
		{#if user}
			<span class="icon-text" bind:this={icon_text}>Create New Task</span>
			<a href="/add-task">
				<i
					role="tooltip"
					class="icon fa-solid fa-plus"
					on:mouseenter={mouseEnter}
					on:mouseleave={mouseLeave}
				/></a
			>
			<a class="link" href="/view-tasks">Tasks</a>
			<form method="post" action="/" use:enhance>
				<button class="log-out">Log Out</button>
			</form>
		{:else}
			<form method="post" action="/login" use:enhance>
				<input type="text" name="credential" value="demolition" hidden />
				<input type="text" name="password" value="dem0" hidden />
				<button class="demo">Log in as Demo User</button>
			</form>
			<a class="link" href="/signup">Sign Up</a>
			<a class="link" href="/login">Log In</a>
		{/if}
	</div>
</nav>

<style lang="scss">
	nav,
	div.btns {
		max-width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
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
		transform: translateX(-50%);
		padding: 10px 0;
		border-bottom: 1px solid $c-sec;
	}

	div.btns {
		i,
		.link,
		button.log-out {
			@include txt-title;

			cursor: pointer;
			border: 1px solid $c-sec;
			border-radius: 0;
			padding: 0.3rem;
			font-size: 1.2rem;
			transition: all 0.5s ease-in-out;
			background-color: $c-overlay;
			margin-right: 0.5rem;

			&:hover {
				background-color: $c-hover;
			}
		}

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;

			font-size: 2.5rem;
			letter-spacing: normal;
			padding: 0.4rem;
			border-radius: 100%;
			height: 1rem;
			width: 1rem;
			transition: none;
		}

		.icon-text {
			margin-right: 0.3rem;
			opacity: 0;
			transition: opacity 0.6s ease-in-out;
		}
	}

	button.demo {
		@include txt-title;

		cursor: pointer;
		outline: none;
		border: none;
		margin-right: 1rem;
		font-size: 0.9rem;

		&:hover {
			text-decoration: underline solid 1px;
		}
	}
</style>
