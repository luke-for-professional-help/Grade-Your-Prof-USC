<script lang="ts">
    import { Rating } from "flowbite-svelte";

    interface Props {
        total?: number;
        rating: any;
        size?: number;
    }

    let { total = 5, rating, size = 16 } = $props();

    // Force numeric conversion
    const numericRating = +rating || 0;
</script>

<Rating {total} rating={numericRating} {size} />
