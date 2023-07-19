<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let user = $page.data.user;
</script>

<div class="wrap">
	<h1>Profile</h1>
	<div>
		<p>User id: {user.id}</p>
		<p>Username: {user.username}</p>
		{#if user.tasks}
			{#each user.tasks as task}
				<p>{task.title}</p>
			{/each}
		{/if}
	</div>

	<form use:enhance method="post">
		<button>Sign Out</button>
	</form>
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
