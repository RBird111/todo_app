<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Input from '$lib/components/Input.svelte';

	let user = $page.data.user;
</script>

<div class="wrap">
	<h1>Add a New Task</h1>

	<form method="post" use:enhance>
		<input type="text" name="userId" bind:value={user.id} hidden />
		<Input name="title" />
		<Input name="description" />
		<Input name="dueDate" />

		<button>Add Task</button>
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
