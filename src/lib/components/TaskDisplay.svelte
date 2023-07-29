<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { enhance } from '$app/forms';

	type Task = {
		id: number;
		title: string;
		description: string;
		completed: boolean;
		dueDate: string;
	};

	export let task: Task;

	let { id, title, description, completed, dueDate } = task;

	let form: HTMLFormElement;

	const deleteTask = () => form.dispatchEvent(new SubmitEvent('submit'));
</script>

{#if task}
	<form method="post" action="/view-tasks?/delete" use:enhance bind:this={form}>
		<input type="text" name="id" value={id} hidden />
		<div class="wrap">
			<div class="ud">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<p class="delete" on:click={deleteTask}>Delete</p>
				<input type="text" name="id" value={id} hidden />
				<button
					class="complete"
					formaction="/view-tasks?/complete"
					on:click={() => (completed = !completed)}
				>
					Completed?
				</button>
				<a href={`/update-task/${id}`} class="update">Update</a>
			</div>

			<div class="task">
				<h2 class="title">{title}</h2>
				<div class="top">
					<div class="att">
						<p class="label">Id:&nbsp</p>
						<p>{id}</p>
					</div>

					<div class="att">
						<p class="label">Completed:&nbsp</p>
						<p>{completed}</p>
					</div>

					<div class="att">
						<p class="label">Due Date:&nbsp</p>
						<p>{formatDate(dueDate)}</p>
					</div>
				</div>

				<p class="description">{description}</p>
			</div>
		</div>
	</form>
{/if}

<style lang="scss">
	.wrap {
		position: relative;
		border: 1px solid $c-sec;
		margin: 0.5rem;
		padding: 0.5rem;
		background-color: $c-overlay;

		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 40vw;
		overflow: hidden;

		&,
		& > .task {
			transition: all 0.6s ease-in-out;
		}

		.ud {
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: $c-font;
			background-color: rgba($color: #000000, $alpha: 0.6);
			font-weight: 600;
			font-size: 2rem;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: opacity 0.6s ease-in;

			& > * {
				@include txt-title;

				cursor: pointer;
				position: relative;
				z-index: 10;
				transition: all 0.3s ease-in-out;
				font-size: 2.1rem;
				padding: 0.8rem 1.6rem;
			}

			button {
				outline: none;
				border: none;
			}
		}

		&:hover {
			& > :not(.ud) {
				transform: scale(1.2);
				filter: blur(0.3rem);
				opacity: 0;
			}

			& > .ud {
				opacity: 1;

				& > *:hover {
					transform: scale(1.2);
				}

				.delete:hover {
					color: $c-acc;
				}

				.complete:hover {
					color: #16db65;
				}

				.update:hover {
					color: #1f80ee;
				}
			}
		}

		h2 {
			font-weight: 500;
			margin-bottom: 0.3rem;
			text-decoration: underline solid;
		}
	}

	.task {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		width: 80%;
	}

	.top {
		display: flex;
		justify-content: space-between;
		margin-top: 0.3rem;
		width: 100%;
	}

	.description {
		margin: 0.5rem 0;
		width: 90%;
		text-align: center;
	}

	.att {
		display: flex;
		flex-wrap: wrap;

		.label {
			font-weight: 500;
		}
	}
</style>
