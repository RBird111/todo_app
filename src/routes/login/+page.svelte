<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let focusTarget: HTMLInputElement;
	onMount(() => {
		if (focusTarget) focusTarget.focus();
	});
</script>

<div class="wrap">
	<h1>Welcome to the Log In Page!</h1>

	<form method="post" autocomplete="off" use:enhance>
		<label>
			<div class="l-wrap">
				Username or Email
				{#if form?.missingCredential}
					<p class="error">must provide username or email</p>
				{:else if form?.invalidCredentials}
					<p class="error">email/username does not exist</p>
				{/if}
			</div>
			<input name="credential" type="text" bind:this={focusTarget} />
		</label>

		<label>
			<div class="l-wrap">
				Password
				{#if form?.missingPassword}
					<p class="error">must provide a password</p>
				{:else if form?.invalidPassword}
					<p class="error">incorrect password</p>
				{/if}
			</div>
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

	h1 {
		margin-bottom: 15px;
	}

	form {
		display: flex;
		flex-flow: column wrap;

		label {
			display: flex;
			flex-flow: column wrap;
			margin-bottom: 10px;
		}

		.l-wrap {
			display: flex;
			justify-content: space-between;

			.error {
				color: $c-acc;
				font-weight: 600;
				text-align: center;
			}
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
			margin-top: 20px;

			&:hover {
				box-shadow: 0 0 5px $c-sec;
			}
		}
	}
</style>
