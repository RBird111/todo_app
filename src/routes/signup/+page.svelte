<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { toErrorObj } from '$lib/utils';
	import Input from '$lib/components/Input.svelte';

	export let form: ActionData;
</script>

<div class="wrap">
	<h1>Welcome to the Sign Up Page!</h1>

	<form method="post" autocomplete="off" use:enhance>
		<Input
			name="firstName"
			autofocus={true}
			errors={toErrorObj(form?.firstName, [
				form?.missing,
				'must provide first name'
			])}
		/>

		<Input
			name="lastName"
			errors={toErrorObj(form?.lastName, [
				form?.missing,
				'must provide last name'
			])}
		/>

		<Input
			name="username"
			errors={toErrorObj(
				form?.username,
				[form?.missing, 'must provide username'],
				[form?.nonUnique, 'username already taken']
			)}
		/>

		<Input
			name="email"
			errors={toErrorObj(
				form?.email,
				[form?.missing, 'must provide an email'],
				[form?.nonUnique, 'email already taken']
			)}
		/>

		<Input
			name="password"
			type="password"
			errors={toErrorObj(
				form?.password,
				[form?.missing, 'must provide a password'],
				[form?.noMatch, 'passwords must match']
			)}
		/>

		<Input
			name="confirmPassword"
			type="password"
			errors={toErrorObj(
				form?.confirmPassword,
				[form?.missing, 'must confirm password'],
				[form?.noMatch, 'passwords must match']
			)}
		/>

		<button>Sign Up</button>
	</form>
</div>

<style lang="scss">
	.wrap {
		padding: 10px;
		display: flex;
		flex-flow: column wrap;
	}

	h1 {
		text-align: center;
		margin-bottom: 15px;
	}

	form {
		display: flex;
		flex-flow: column wrap;

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
