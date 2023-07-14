<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	export let form: ActionData;

	let focusTarget: HTMLElement;
	onMount(() => {
		focusTarget.focus();
	});
</script>

<div class="wrap">
	<h1>Welcome to the Log In Page!</h1>

	{#if form?.success}
		<p>Welcome Back!</p>
	{:else if form?.fail}
		<p>Fail!</p>
	{:else}
		<p style:opacity="0">placeholder</p>
	{/if}

	<form method="POST" autocomplete="off" use:enhance>
		<label>
			Username
			<input name="username" type="text" bind:this={focusTarget} />
		</label>

		<label>
			Password
			<input name="password" type="password" />
		</label>

		<p style:opacity="0">placeholder</p>

		<button>Log In</button>
	</form>
</div>

<style lang="scss">
	.wrap {
		padding: 10px;
		display: flex;
		flex-flow: column wrap;

		p {
			text-align: center;
			font-weight: 400;
		}
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
