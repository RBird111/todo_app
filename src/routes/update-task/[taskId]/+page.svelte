<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { toErrorObj } from '$lib/utils';
	import Input from '$lib/components/Input.svelte';
	import TextArea from '$lib/components/TextArea.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="wrap">
	<h1>Update Task</h1>

	<form method="post" use:enhance>
		<input type="text" name="id" bind:value={data.task.id} hidden />

		<Input
			name="title"
			value={data.task.title}
			autofocus={true}
			errors={toErrorObj(form?.title, [form?.missing, 'must provide a title'])}
		/>

		<Input
			name="dueDate"
			placeholder="MM/DD/YYYY"
			value={data.task.dueDate.toISOString().split('T')[0]}
			type="date"
			errors={toErrorObj(form?.dueDate, [form?.missing, 'must set a due date'])}
		/>

		<TextArea
			name="description"
			value={data.task.description}
			errors={toErrorObj(form?.description, [
				form?.missing,
				'must provide a task description'
			])}
		/>

		<button>Update Task</button>
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
