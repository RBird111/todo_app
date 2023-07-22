<script lang="ts">
	import Error from './Error.svelte';

	export let label: string;
	export let name: string;
	export let type = 'text';
	export let autofocus: boolean = false;

	export let errors: Errors = null;

	type Errors =
		| {
				name: boolean | '' | undefined;
				isError: boolean | '' | undefined;
				message: string;
		  }[]
		| null;
</script>

<label>
	<div class="wrap">
		{label}
		{#if errors}
			{#each errors as error}
				<Error {...error} />
			{/each}
		{/if}
	</div>
	<!-- svelte-ignore a11y-autofocus -->
	<input {type} {name} {autofocus} />
</label>

<style lang="scss">
	label {
		display: flex;
		flex-flow: column wrap;
		margin-bottom: 20px;

		.wrap {
			display: flex;
			justify-content: space-between;
		}
	}

	input {
		outline: none;
		border: none;
		background-color: $c-sec;
		color: $c-font;
		padding: 5px;
	}
</style>
