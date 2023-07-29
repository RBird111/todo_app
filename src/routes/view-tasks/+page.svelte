<script lang="ts">
	import { page } from '$app/stores';
	import TaskDisplay from '$lib/components/TaskDisplay.svelte';

	type Task = {
		id: number;
		title: string;
		description: string;
		completed: boolean;
		dueDate: string;
	};

	$: user = $page.data.user;
	$: tasks = $page.data.user.tasks as Task[];
	let filter: boolean | null = null;

	$: taskFilter = (task: Task) => {
		if (filter !== null) return task.completed === filter;
		return true;
	};
</script>

<div class="wrap">
	<h1 style:margin-bottom="0.5rem">{user.firstName}'s Tasks:</h1>
	<div class="tasks">
		{#if user.tasks}
			{#if Object.values(user.tasks).length}
				<form class="filter">
					<fieldset>
						<legend>Filter by:</legend>
						<label>
							<input
								name="filter"
								type="radio"
								checked
								on:change={() => (filter = null)}
							/>
							None
						</label>

						<label>
							<input
								name="filter"
								type="radio"
								on:change={() => (filter = true)}
							/>
							Completed
						</label>

						<label>
							<input
								name="filter"
								type="radio"
								on:change={() => (filter = false)}
							/>
							Not Completed
						</label>
					</fieldset>
				</form>
				{#each tasks.filter(taskFilter) as task (task.id)}
					<TaskDisplay {task} />
				{/each}
			{:else}
				<p>You don't have any tasks.</p>
				<a href="/add-task">Lets create some!</a>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.wrap {
		position: relative;
		padding: 10px;
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-items: center;

		p {
			text-align: center;
			font-weight: 400;
		}

		h1 {
			margin-bottom: 0.8rem;
			text-decoration: solid underline;
		}
	}

	.tasks {
		overflow-y: auto;
		min-width: 50vw;
		min-height: 60vh;
		max-height: 60vh;
		border: 1px solid $c-font;

		&:has(> a) {
			overflow: hidden;
			border: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			min-height: unset;

			& > * {
				font-weight: 200;
				font-size: 1.6rem;
			}

			a {
				text-decoration: underline dashed 1px;
			}
		}
	}

	.filter {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(100%, 3.5rem);

		fieldset {
			display: flex;
			flex-direction: column;
			border: 1px solid $c-sec;
			padding: 0.3rem;
		}
	}
</style>
