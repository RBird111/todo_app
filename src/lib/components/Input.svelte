<script lang="ts">
	import { onMount } from 'svelte';
	import Error from './Error.svelte';

	export let name: string;
	export let label: string = makeLabel();
	export let type: string = 'text';
	export let placeholder: string = '';
	export let autofocus: boolean = false;

	export let errors: Errors = null;

	function makeLabel() {
		const myMatch = name.match(/[A-Z]/);
		if (myMatch?.index) {
			const firstHalf = name
				.slice(0, myMatch.index)
				.split('')
				.map((c, i) => (!i ? c.toUpperCase() : c))
				.join('');

			const lastHalf = name.slice(myMatch.index);

			return firstHalf + ' ' + lastHalf;
		}

		return name
			.split('')
			.map((c, i) => (!i ? c.toUpperCase() : c))
			.join('');
	}

	let ref: HTMLElement;
	onMount(() => {
		if (autofocus) ref.focus();
	});

	const setType = (node: HTMLInputElement) => {
		node.type = type;
	};

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
	<input use:setType {name} bind:this={ref} {placeholder} />
</label>

<style lang="scss">
	label {
		display: flex;
		flex-flow: column wrap;
		margin-bottom: 20px;

		.wrap {
			display: flex;
			justify-content: space-between;
			min-width: 25vw;
		}
	}

	input {
		outline: none;
		border: none;
		background-color: $c-sec;
		color: $c-font;
		padding: 5px;

		&::placeholder {
			color: $c-main;
		}
	}
</style>
