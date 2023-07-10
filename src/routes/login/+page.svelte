<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<div class="wrap">
	<h1>Welcome to the Log In Page!</h1>

	{#if form?.success && form.user}
		<p>Welcome Back {form.user.firstName + ' ' + form.user.lastName[0] + '.'}</p>
	{:else}
		<p style:opacity="0">hidden</p>
	{/if}
	<form method="POST" use:enhance>
		{#if form?.email && form.missing}
			<p class="error">Must Submit Email</p>
		{:else if form?.email && form.incorrect}
			<p class="error">Email Does Not Match Existing User</p>
		{:else}
			<p style:opacity="0">hidden</p>
		{/if}
		<label>
			Email
			<input name="email" type="email" />
		</label>

		{#if form?.password && form.missing}
			<p class="error">Must Submit Password</p>
		{:else if form?.password && form.incorrect}
			<p class="error">Incorrect Password</p>
		{:else}
			<p style:opacity="0">hidden</p>
		{/if}
		<label>
			Password
			<input name="password" type="password" />
		</label>

		<p style:opacity="0">hidden</p>

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

		p.error {
			color: $c-acc;
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
