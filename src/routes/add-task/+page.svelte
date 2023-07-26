<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { toErrorObj } from '$lib/utils';
	import Input from '$lib/components/Input.svelte';

	export let form: ActionData;

	let user = $page.data.user;
</script>

<div class="wrap">
	<h1>Add a New Task</h1>

	<form method="post" use:enhance>
		<input type="text" name="userId" bind:value={user.id} hidden />

		<Input
			name="title"
			errors={toErrorObj(form?.title, [form?.missing, 'must provide a title'])}
		/>

		<Input
			name="dueDate"
			placeholder="MM/DD/YYYY"
			type="date"
			errors={toErrorObj(form?.dueDate, [form?.missing, 'must set a due date'])}
		/>

		<Input
			name="description"
			errors={toErrorObj(form?.description, [
				form?.missing,
				'must provide a task description'
			])}
		/>

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
