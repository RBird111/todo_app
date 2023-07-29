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
			{#if Object.values(user.tasks).length}
				{#each user.tasks as task}
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
		padding: 10px;
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-items: center;

		p {
			text-align: center;
			font-weight: 400;
		}
	}

	.tasks {
		overflow-y: auto;
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
				text-decoration: underline dotted;
			}
		}
	}
</style>
