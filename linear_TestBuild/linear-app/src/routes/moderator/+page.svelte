<script>
    import { user } from "$lib/stores/user";
    import { Card, Tabs, TabItem, Button } from "flowbite-svelte";
    import { goto } from '$app/navigation';
    import ReviewDisplayCard from "$lib/components/requestManagement/reviewDisplayCard.svelte";
    import RequestDisplayCard from "$lib/components/requestManagement/requestDisplayCard.svelte";
    import DisplayGuidelines from "$lib/components/requestManagement/displayGuidelines.svelte";

    let { data } = $props();

    function goToPage(paramName, p) {
        const url = new URL(window.location.href);
        url.searchParams.set(paramName, p.toString());
        goto(url.toString(), { noScroll: true, keepFocus: true });
    }
</script>

<div class="flex justify-center items-start mt-20 pb-20">
    <div class="w-full max-w-5xl p-6">
        <Card size="xl" class="text-justify p-8 mb-4">
            <h3 class="text-2xl font-bold">Welcome, {$user.name}!</h3>
            <p class="text-gray-600 text-sm">Review the community guidelines before taking action.</p>
        </Card>

        <Tabs style="underline">
            <TabItem open title="Moderate Reviews">
                <div class="space-y-4 pt-4">
                    {#each data.reviews as review (review.Review_ID)}
                        <ReviewDisplayCard {review} />
                    {:else}
                        <p class="p-4 text-gray-500">No pending reviews.</p>
                    {/each}
                </div>
                {#if data.pagination.totalRevPages > 1}
                    <div class="flex justify-center items-center gap-4 mt-8">
                        <Button color="alternative" size="sm" onclick={() => goToPage('revPage', data.pagination.revPage - 1)} disabled={data.pagination.revPage <= 1}>Previous</Button>
                        <span class="text-sm">Page {data.pagination.revPage} of {data.pagination.totalRevPages}</span>
                        <Button color="alternative" size="sm" onclick={() => goToPage('revPage', data.pagination.revPage + 1)} disabled={data.pagination.revPage >= data.pagination.totalRevPages}>Next</Button>
                    </div>
                {/if}
            </TabItem>

            <TabItem title="Moderate Requests">
                <div class="space-y-4 pt-4">
                    {#each data.requests as req (req.Request_ID)}
                        <RequestDisplayCard requestData={req} />
                    {:else}
                        <p class="p-4 text-gray-500">No pending requests.</p>
                    {/each}
                </div>
                {#if data.pagination.totalReqPages > 1}
                    <div class="flex justify-center items-center gap-4 mt-8">
                        <Button color="alternative" size="sm" onclick={() => goToPage('reqPage', data.pagination.reqPage - 1)} disabled={data.pagination.reqPage <= 1}>Previous</Button>
                        <span class="text-sm">Page {data.pagination.reqPage} of {data.pagination.totalReqPages}</span>
                        <Button color="alternative" size="sm" onclick={() => goToPage('reqPage', data.pagination.reqPage + 1)} disabled={data.pagination.reqPage >= data.pagination.totalReqPages}>Next</Button>
                    </div>
                {/if}
            </TabItem>

            <TabItem title="Approval History">
                <div class="space-y-4 pt-4">
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
                {#if data.pagination.totalHistPages > 1}
                    <div class="flex justify-center items-center gap-4 mt-8">
                        <Button color="alternative" size="sm" onclick={() => goToPage('histPage', data.pagination.histPage - 1)} disabled={data.pagination.histPage <= 1}>Previous</Button>
                        <span class="text-sm">Page {data.pagination.histPage} of {data.pagination.totalHistPages}</span>
                        <Button color="alternative" size="sm" onclick={() => goToPage('histPage', data.pagination.histPage + 1)} disabled={data.pagination.histPage >= data.pagination.totalHistPages}>Next</Button>
                    </div>
                {/if}
            </TabItem>

            <TabItem title="Guidelines">
                <div class="pt-4"><DisplayGuidelines/></div>
            </TabItem>
        </Tabs>
    </div>
</div>