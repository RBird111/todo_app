<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	let focusTarget: HTMLElement;
	onMount(() => {
		focusTarget.focus();
	});
</script>

<div class="wrap">
	<h1>Welcome to the Log In Page!</h1>

	<form method="post" autocomplete="off" use:enhance>
		<label>
			Username or Email
			<input name="credential" type="text" bind:this={focusTarget} />
		</label>

		<label>
			Password
			<input name="password" type="password" />
		</label>

		<button>Log In</button>
	</form>
</div>

<style lang="scss">
	.wrap {
		padding: 10px;
		display: flex;
		flex-flow: column wrap;
	}

	form {
		display: flex;
		flex-flow: column wrap;

		label {
			display: flex;
			flex-flow: column wrap;
			margin-bottom: 20px;
		}

		input {
			outline: none;
			border: none;
			background-color: $c-sec;
			color: $c-font;
			padding: 5px;
		}

		button {
			@include txt-title;

			cursor: pointer;
			font-size: 1rem;
			font-weight: 400;
			border: none;
			border-radius: 3px;
			outline: 1px solid $c-font;
			background-color: $c-acc;
			color: $c-font;
			padding: 5px 0;

			&:hover {
				box-shadow: 0 0 5px $c-sec;
			}
		}
	}
</style>
