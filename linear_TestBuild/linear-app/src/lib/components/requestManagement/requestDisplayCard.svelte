<script>
    import { Card, Button, Badge } from "flowbite-svelte";
    import PopProfessorRequest from "./requestModal/popProfessorRequest.svelte";
    import PopSubjectRequest from "./requestModal/popSubjectRequest.svelte";
    import { FileSearchOutline, TrashBinOutline } from "flowbite-svelte-icons";

    let { requestData } = $props();
    let showModal = $state(false);

    const statusMap = {
        1: { text: 'Pending', color: 'yellow' },
        2: { text: 'Approved', color: 'green' },
        3: { text: 'Rejected', color: 'red' }
    };

    const currentStatus = $derived(statusMap[requestData.Status_ID] || { text: 'Unknown', color: 'dark' });
</script>

<Card class="mb-4 relative p-4 max-w-5xl shadow-md border-l-4" style="border-left-color: var(--tw-color-{currentStatus.color}-500)">
    <div class="absolute top-4 right-4 flex items-center gap-2">
        <Badge color={currentStatus.color} class="px-4 py-1 text-xs font-bold uppercase">{currentStatus.text}</Badge>
    </div>

    <div class="flex items-center justify-between gap-4 mt-2 text-left">
        <div class="flex-grow space-y-2">
            <span class="text-[10px] font-bold tracking-widest bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">
                {requestData.requestType} Request
            </span>
            <div class="pt-1">
                <h3 class="text-lg font-extrabold text-gray-900">
                    {requestData.profName || requestData.subName}
                </h3>
                {#if requestData.subCode}<p class="text-xs font-bold text-gray-400">{requestData.subCode}</p>{/if}
            </div>
            <p class="text-[11px] text-gray-400">By <span class="font-bold">{requestData.Username}</span></p>
        </div>

        <div class="flex flex-col gap-2">
            <Button color="orange" size="sm" class="font-bold" onclick={() => (showModal = true)}>View Details</Button>
            
            {#if requestData.Status_ID === 3}
                <form method="POST" action="?/deleteRequest">
                    <input type="hidden" name="requestId" value={requestData.Request_ID} />
                    <Button type="submit" color="red" outline size="xs" class="w-full">
                        <TrashBinOutline class="w-3 h-3 me-1" /> Delete
                    </Button>
                </form>
            {/if}
        </div>
    </div>
</Card>

{#if showModal}
    {#if requestData.requestType === 'professor' || requestData.requestType === 'reassignment'}
        <PopProfessorRequest {requestData} bind:open={showModal} />
    {:else}
        <PopSubjectRequest {requestData} bind:open={showModal} />
    {/if}
{/if}