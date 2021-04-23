<script>
	import Header from "./UI/Header.svelte";
	import TestQuestion from "./TestQuestion.svelte";
	let strt = 0;

	function handleClick() {
		strt = 1;
		// que_no=1;
	}
</script>

<style>
	main {
		padding-top: 3rem;
		margin: 1rem;
	}
	.btn {
		margin-top: 20%;
		margin-right: 5%;
	}
</style>

<main>
	<Header />

	{#if strt}
		<TestQuestion onclick={handleClick} />
	{:else}
		<center class="btn">
			<button on:click={handleClick}>Start Test</button>
		</center>
	{/if}
</main>
