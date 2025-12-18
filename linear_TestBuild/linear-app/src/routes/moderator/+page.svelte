<script>
    import { user } from "$lib/stores/user";
    import { Card, Tabs, TabItem } from "flowbite-svelte";
    import ReviewDisplayCard from "$lib/components/requestManagement/reviewDisplayCard.svelte";
    import RequestDisplayCard from "$lib/components/requestManagement/requestDisplayCard.svelte";
    import DisplayGuidelines from "$lib/components/requestManagement/displayGuidelines.svelte";
    import Footer from "$lib/components/footer.svelte";

    // Data passed from +page.server.js
    let { data } = $props(); 

    // Svelte 5 Reactive State for filtering
    let activeFilter = $state('all'); // options: 'all', 'review', 'request'

    // Derived list based on the active filter
    const filteredHistory = $derived(
        activeFilter === 'all' 
            ? data.history 
            : data.history.filter(item => item.category === activeFilter)
    );
</script>

<div class="flex justify-center items-start mt-20">
    <div class="w-full max-w-5xl p-6">
        <Card size="xl" class="text-justify p-8 mb-4">
            <h3 class="text-2xl font-bold">Welcome, {$user.name}!</h3>
            <p class="text-gray-600 text-sm">Review the community guidelines before taking action.</p>
        </Card>

        <Tabs style="underline">
            <TabItem open title="Moderate Reviews">
                {#each data.reviews as review (review.Review_ID)}
                    <ReviewDisplayCard {review} />
                {:else}
                    <p class="p-4 text-gray-500">No pending reviews.</p>
                {/each}
            </TabItem>

            <TabItem title="Moderate Requests">
                {#each data.requests as req (req.Request_ID)}
                    <RequestDisplayCard requestData={req} />
                {:else}
                    <p class="p-4 text-gray-500">No pending requests.</p>
                {/each}
            </TabItem>

            <TabItem title="Approval History">
                <div class="space-y-4">
                    {#each data.history as item}
                        {#if item.category === 'review'}
                            <ReviewDisplayCard review={item} />
                        {:else}
                            <RequestDisplayCard requestData={item} />
                        {/if}
                    {:else}
                        <p class="p-4 text-gray-500">No history found.</p>
                    {/each}
                </div>
            </TabItem>

            <TabItem title="Guidelines">
                <DisplayGuidelines/>
            </TabItem>
        </Tabs>
    </div>
</div>
