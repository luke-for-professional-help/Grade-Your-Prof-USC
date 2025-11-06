<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let results = [];
    let query = "";

    // get query from the URL
    $: query = $page.url.searchParams.get('q') || "";

    // fetch results when query changes
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

