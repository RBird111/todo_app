<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="wrap">
	<h1>Welcome to the Log In Page!</h1>

	{#if form?.incorrect}
		<p style:color="#ef233c">Bad Data</p>
	{/if}

	{#if form?.success}
		<p>Yeah!</p>
	{/if}

	{#if form?.user}
		<p>Email: {form.user.email}</p>
		<p>First Name: {form.user.firstName}</p>
		<p>Last Name: {form.user.lastName}</p>
	{/if}

	<form method="POST" use:enhance>
		<label>
			Email
			<input name="email" type="email" />
		</label>

		<label>
			Password
			<input name="password" type="password" />
		</label>

		<button>Submit</button>
	</form>
</div>

<style lang="scss">
	.wrap {
		padding: 10px;
		display: flex;
		flex-flow: column wrap;

		p {
			text-align: center;
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
