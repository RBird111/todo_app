<script lang="ts">
	export let name: boolean | '' | undefined;
	export let isError: boolean | '' | undefined;
	export let message: string;
</script>

{#if name && isError}
	<p class="error">{message}</p>
{/if}

<style lang="scss">
	.error {
		color: $c-acc;
		font-weight: 600;
		text-align: center;
	}
</style>
