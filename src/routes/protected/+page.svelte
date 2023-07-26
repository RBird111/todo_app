<script lang="ts">
	import { page } from '$app/stores';
	import TaskDisplay from '$lib/components/TaskDisplay.svelte';

	$: user = $page.data.user;
</script>

<div class="wrap">
	<h1>Profile</h1>
	<p>User id: {user.id}</p>
	<p style:margin-bottom="0.5rem">Username: {user.username}</p>
	<div class="tasks">
		{#if user.tasks}
			{#each user.tasks as task (task.id)}
				<TaskDisplay {task} />
			{/each}
		{/if}
	</div>
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
	}

	.tasks {
		overflow-y: scroll;
		height: 60vh;
		border: 1px solid $c-font;
	}
</style>
