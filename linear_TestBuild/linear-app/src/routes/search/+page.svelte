<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import SearchResults from '$lib/components/search/searchResults.svelte';
    import { Card } from "flowbite-svelte";
    import Pageination from '$lib/components/item-management/pageination.svelte';

//script for handling user query
    let results = [];
    let query = "";

    $: query = $page.url.searchParams.get('q') || "";

    $: if (query) {
        fetchResults();
    }

    async function fetchResults() {
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            results = await res.json();
        } catch(err) {
            console.error("Error fetching search results", err);
        }   
  }
</script>

<!--AFTER USER PRESSES ENTER ON THE SEARCH BAR, THEY GET DIRECTED TO THIS PAGE + THE QUERY NO MATTER IF ITS
                                                BY SUBJECT CODE OR PROFESSOR'S NAME-->
<div class="flex justify-center items-start mt-20">
	<div class="w-full max-w-5xl rounded-xl p-6">
        <Card size="xl" class="p-4 text-left sm:p-8 md:p-10">
            <h1 class="text-base md:text-xl font-bold tracking-tight text-gray-600 pb-3">Results for "QUERY":</h1>
            
            <div class="text-center">
                <Pageination />
            </div>
        </Card>
	</div>
</div>

