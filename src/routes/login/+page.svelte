<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { toErrorObj } from '$lib/utils';
	import Input from '$lib/components/Input.svelte';

	export let form: ActionData;
</script>

<div class="wrap">
	<h1>Welcome to the Log In Page!</h1>

	<form method="post" autocomplete="off" use:enhance>
		<Input
			label="Username or Email"
			name="credential"
			autofocus={true}
			errors={toErrorObj(
				form?.credential,
				[form?.missing, 'must provide username or email'],
				[form?.invalid, 'email/username does not exist']
			)}
		/>

		<Input
			name="password"
			type="password"
			errors={toErrorObj(
				form?.password,
				[form?.missing, 'must provide a password'],
				[form?.invalid, 'incorrect password']
			)}
		/>

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
			margin-top: 20px;

			&:hover {
				box-shadow: 0 0 5px $c-sec;
			}
		}
	}
</style>
