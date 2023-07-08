<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: userId = data.user ? data.user.id : -1;
	$: tasks = data.user ? data.user.tasks : [];

	const formatDate = (date: Date) => {
		let dStr = new Date(date).toISOString();

		// [[%Y], [%M], [%D]]
		let dArr: string[] = dStr.split('T')[0].split('-');

		// "%M/%D/%Y"
		return [dArr[1], dArr[2], dArr[0]].join('/');
	};
</script>

<div>
	<h1>Tasks For User {userId}</h1>
	{#each tasks as task, i (task.id)}
		<details class="task">
			<summary style:font-weight="600">Task #{i + 1}</summary>
			<p>{task.title}</p>
			<p>Created At: {formatDate(task.createdAt)}</p>
		</details>
	{/each}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
	}

	.task {
		border: 1px solid $c-sec;
		margin: 5px 0;
		padding: 0.6rem;
	}

	h1 {
		@include txt-title;
	}
</style>
