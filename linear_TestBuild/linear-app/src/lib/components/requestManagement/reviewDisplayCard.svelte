<script>
    import { Card, Button, Badge, Rating } from "flowbite-svelte";
    import PopReviewDetails from "./reviewModal/popReviewDetails.svelte";
    import { FileSearchOutline, QuoteOutline, TrashBinOutline } from "flowbite-svelte-icons";

    let { review } = $props();
    let showModal = $state(false);

    const statusMap = {
        1: { text: 'Pending', color: 'yellow' },
        2: { text: 'Approved', color: 'green' },
        3: { text: 'Rejected', color: 'red' }
    };

    const currentStatus = $derived(statusMap[review.Status_ID] || { text: 'Unknown', color: 'dark' });
</script>

<Card class="mb-4 relative p-4 max-w-5xl shadow-md border-l-4" style="border-left-color: var(--tw-color-{currentStatus.color}-500)">
    <div class="absolute top-4 right-4 flex items-center gap-2">
        {#if review.Study_Load}
            <Badge color="indigo" class="px-2 py-1"><FileSearchOutline class="w-3 h-3 me-1" /> Proof Attached</Badge>
        {/if}
        <Badge color={currentStatus.color} class="px-4 py-1 text-xs font-bold uppercase shadow-sm">{currentStatus.text}</Badge>
    </div>

    <div class="flex items-center justify-between gap-6 mt-2 text-left">
        <div class="flex-grow space-y-3">
            <span class="text-[10px] font-bold tracking-widest bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">Review Submission</span>
            <div>
                <h3 class="text-xl font-extrabold text-gray-900">{review.Professor_Name}</h3>
                <p class="text-sm font-medium text-gray-500">{review.Subject_Code}</p>
                <div class="flex items-center gap-2 mt-1">
                    <Rating total={5} rating={Number(review.Rating)} size="16" />
                </div>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg border-l-2 border-green-200">
                <p class="text-sm text-gray-700 italic line-clamp-2">
                    <QuoteOutline class="inline w-3 h-3 me-1 text-green-500" />
                    {review.Description || "No feedback."}
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <Button color="green" class="font-bold py-2 px-4" onclick={() => (showModal = true)}>Verify</Button>
            
            {#if review.Status_ID === 3}
                <form method="POST" action="?/deleteReview">
                    <input type="hidden" name="reviewId" value={review.Review_ID} />
                    <Button type="submit" color="red" outline size="xs" class="w-full">
                        <TrashBinOutline class="w-3 h-3 me-1" /> Delete
                    </Button>
                </form>
            {/if}
        </div>
    </div>
</Card>

{#if showModal}
    <PopReviewDetails {review} bind:open={showModal} />
{/if}