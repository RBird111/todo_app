<script lang="ts">
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';

	$: user = $page.data.user;

	const navElements = ['Protected', 'Sign Up', 'Log In'];
	const getHref = (loc: string) => {
		return `/${loc.toLowerCase().split(' ').join('')}`;
	};

	$: isHidden = (loc: string) => {
		if (loc === 'Protected' && (!user || !Object.values(user).length))
			return true;
		if ((loc === 'Sign Up' || loc === 'Log In') && user) return true;
		return false;
	};
</script>

<nav class="main-nav">
	<Logo />
	<div class="btns">
		{#each navElements as loc}
			<a href={getHref(loc)} hidden={isHidden(loc)}>
				{loc}
			</a>
		{/each}
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

		background-color: $c-overlay;
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
