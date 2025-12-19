<script lang="ts">
    import heroImage from "$lib/assets/hero-background.jpg";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { Card } from "flowbite-svelte";
    import ProfessorQueryResults from '$lib/components/professor/professorQueryResults.svelte';
	import Footer from "$lib/components/footer.svelte";

//script for handling user query
let query = $state("");

// async function search() {
//   const response = await fetch(`/search?term=${encodeURIComponent(query)}`);
//   const data = await response.json();
//   console.log(data);
// }

let {data} = $props();
console.log(data);

</script>

<section class="relative isolate min-h-[30vh] flex flex-col items-center justify-center px-4">
    <div class="relative w-full max-w-3xl mt-14 pt-6 ">
        <div aria-hidden="true" class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-screen h-[30vh] bg-gray-900/40">
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
                name="term"
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
</section>


<!--FOR BACKEND: AFTER USER PRESSES ENTER ON THE SEARCH BAR, THEY GET DIRECTED TO THIS PAGE + THE QUERY NO MATTER IF ITS
                                                             BY SUBJECT CODE OR PROFESSOR'S NAME-->
<!--DISPLAY THE PROFS AVAILABLE THROUGH QUERY
Data{
professor_name:
subject_id
}-->
<div class="flex justify-center items-start mt-20 pb-20">
	<div class="w-full max-w-5xl rounded-xl p-6">
        <Card size="xl" class="p-4 text-left sm:p-8 md:p-10">
            <h1 class="text-base md:text-xl font-bold tracking-tight text-gray-600 pb-3">Results for "{query}":</h1>
            {#if Array.isArray(data.rows)}
                {#each data.rows as result}
                    <ProfessorQueryResults profResult={result}/>
                {/each}
            {/if}

            <!-- <ProfessorQueryResults profResult={data.rows}/> -->
            <div class="text-center mt-4">
                <p>Cant find your prof or subject? <a href="/request-page" class="text-blue-600 underline">Click here.</a></p>
            </div>
        </Card>
	</div>
</div>


