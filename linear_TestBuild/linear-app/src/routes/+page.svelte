<script lang="ts">
    
    import { DarkMode } from "flowbite-svelte";
    import FAQAccordion from "$lib/components/FAQAccordion.svelte";
	
	let query = "";
</script>


<section class="relative isolate min-h-[60vh] flex flex-col items-center justify-center px-4">
	<!--Title container-->
    <div class="flex flex-col items-center justify-center mb-8">
		<div class="flex justify-center items-start mt-10 mb-10">
			<h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">Grade your <span class="text-orange-500">Prof</span>
			</h1>
		</div>
    </div>

    <!-- Search area  -->
    <div class="relative w-full max-w-3xl mt-14 pt-6 ">
		<!-- Background band for future image: spans full width, 10% viewport height -->
		<div aria-hidden="true" class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-screen h-[30vh] bg-gray-900/40">
        <img src="$lib/assets/hero-background.jpg" alt="Background" class="w-full h-full object-cover">
    </div>

		<!-- Search input (no functionality yet) -->
	<form action="/searcher" method="GET">
		<div class="relative z-10 rounded-full bg-white/90 shadow-lg ring-1 ring-black/10 backdrop-blur">
			<div class="flex items-center gap-3 px-5">
			<svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<circle cx="11" cy="11" r="8" />
				<path d="M21 21l-4.3-4.3" />
			</svg>
			<label for="hero-search" class="sr-only">Search</label>
			<input
				id="hero-search"
				name="q"
				type="text"
				bind:value={query}
				placeholder="Search"
				class="w-full bg-transparent py-4 outline-none text-gray-900 placeholder:text-gray-400"
				autocomplete="off"
				/>
			</div>
		</div>
	</form>
    <!--End of search area-->


</section>
<div class="flex justify-center items-start mt-20">
	<div class="w-full max-w-5xl rounded-xl p-6">
		<FAQAccordion></FAQAccordion>
	</div>
</div>
