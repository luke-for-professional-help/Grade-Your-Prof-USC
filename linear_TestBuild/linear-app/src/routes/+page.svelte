<script lang="ts">
    import FAQAccordion from "$lib/components/FAQAccordion.svelte";
	import heroImage from '$lib/assets/hero-background.jpg';
	import { Heading, P, Button } from "flowbite-svelte";
	import Footer from "$lib/components/footer.svelte";

	let query = "";
</script>

<!--LANDING PAGE/SEARCH AREA/FAQs-->
<section class="relative isolate min-h-[60vh] flex flex-col items-center justify-center px-4 pb-20">
	<div class="text-center mb-4">
		<Heading tag="h1" class="mb-4 pb-4 text-4xl md:text-5xl lg:text-6xl" style="font-family: 'Lato', sans-serif;">
			Grade Your <span class="text-orange-500">Prof</span>
		</Heading>
			
		<P class="mb-6 text-lg sm:px-16 lg:text-xl xl:px-48 dark:text-gray-400 text-center">
		  	Choose the right for your academic journey.
		</P>
	</div>
	<!-- HERO AREA -->
	 
    <div class="relative w-full max-w-3xl mt-14 pt-6 ">
		<div aria-hidden="true" class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-screen h-[30vh] bg-gray-900/40">
        	
			<img src={heroImage} alt="Background" class="w-full h-full object-cover">
			<div class="absolute inset-0 bg-gray-900/80">
				<h4 class="flex flex-col items-center justify-center mb-8 text-white
							text-3xl tracking-tight pt-7
							">Search to start
				</h4>
				<p class="flex flex-col items-center mb-8 text-white
						text-xs tracking-tight pt-7">
					Search by professor name or subject code.
				</p>
			</div> 
    	</div>

	<!--SEARCH INPUT BACKEND PLS COOK THIS ILY GUYS-->
		<form action="/search" method="GET">
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
	</div>
	    <!--End of search area-->
	<div class="flex justify-center items-start mt-20">
		<div class="w-full max-w-5xl rounded-xl p-6">
			<h1 class="text-base md:text-3xl font-bold tracking-tight text-gray-600 pb-3">FAQ:</h1>
			<FAQAccordion></FAQAccordion>
		</div>
	</div>
</section>






