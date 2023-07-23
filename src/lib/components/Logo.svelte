<script lang="ts">
	export let active = true;
</script>

<a href={active ? '/' : '#'} style:cursor={active ? 'pointer' : 'default'}>
	<div class="logo">
		<span class="paren">(</span>u<span class="paren">)</span>
		<span class="do">do</span>
		<span class="arrow">-></span> U
	</div>
</a>

<style lang="scss">
	a {
		background-color: transparent;
	}

	div.logo {
		@include txt-code;

		margin: var(--margin, 0);
		background-color: transparent;
		font-size: var(--font-size, 1.5rem);
	}

	span:is(.paren, .arrow) {
		font-weight: bold;
	}

	span.paren {
		color: $c-acc;
	}

	span.arrow {
		color: $c-acc;
	}

	span.do {
		color: $c-sec;
	}
</style>
