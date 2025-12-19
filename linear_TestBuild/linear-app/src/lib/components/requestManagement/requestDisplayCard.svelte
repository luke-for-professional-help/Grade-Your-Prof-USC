<script>
    import { Card, Button, Badge, Avatar } from "flowbite-svelte";
    import PopProfessorRequest from "./requestModal/popProfessorRequest.svelte";
    import PopSubjectRequest from "./requestModal/popSubjectRequest.svelte";
    import { FileSearchOutline } from "flowbite-svelte-icons";

    let { requestData } = $props();
    let showModal = $state(false);

    const statusMap = {
        1: { text: 'Pending', color: 'yellow' },
        2: { text: 'Approved', color: 'green' },
        3: { text: 'Rejected', color: 'red' }
    };

    const currentStatus = $derived(statusMap[requestData.Status_ID] || { text: 'Unknown', color: 'dark' });
    const isDual = $derived(!!(requestData.profName && requestData.subName));
    const displayTag = $derived(isDual ? 'Reassignment' : requestData.requestType);

    // CRASH PROTECTION: Optional chaining (?.) handles NULL Study_Load
    const fileExt = $derived(requestData.Study_Load?.split('.').pop()?.toLowerCase() ?? '');
</script>

<Card class="mb-4 relative p-4 max-w-5xl shadow-md border-l-4" style="border-left-color: var(--tw-color-{currentStatus.color}-500)">
    <div class="absolute top-4 right-4 flex items-center gap-2">
        {#if requestData.Study_Load}
            <Badge color="indigo" class="px-2 py-1">
                <FileSearchOutline class="w-3 h-3 me-1" /> Proof Attached
            </Badge>
        {/if}
        <Badge color={currentStatus.color} class="px-4 py-1 text-xs font-bold uppercase shadow-sm">
            {currentStatus.text}
        </Badge>
    </div>

    <div class="flex items-center justify-between gap-4 mt-2 text-left">
        <div class="flex-grow space-y-2">
            <span class="text-[10px] font-bold tracking-widest bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">
                {displayTag}
            </span>
            
            <div class="pt-1">
                <h3 class="text-xl font-extrabold leading-tight text-gray-900">
                    Request for {isDual ? 'Reassignment' : (requestData.requestType === 'subject' ? 'Subject' : 'Professor')}
                </h3>
                
                <div class="mt-1">
                    {#if requestData.profName}
                        <h4 class="text-lg font-bold text-gray-800">Professor: {requestData.profName}</h4>
                    {/if}
                    {#if requestData.subName}
                        <h4 class="text-lg font-medium text-gray-600">Course: {requestData.subCode} - {requestData.subName}</h4>
                    {/if}
                </div>
            </div>

            <p class="text-sm text-gray-500 pt-1">
                Submitted by <span class="font-semibold text-gray-700">{requestData.Username}</span>
            </p>
        </div>

        <div class="flex-shrink-0">
            <Button 
                class="bg-[#E64A19] hover:bg-[#D84315] text-white font-bold py-4 px-6 rounded-lg transition-transform active:scale-95"
                onclick={() => (showModal = true)}
            >
                View Details
            </Button>
        </div>
    </div>
</Card>

{#if showModal}
    {#if requestData.requestType === 'professor' || isDual}
        <PopProfessorRequest {requestData} {fileExt} bind:open={showModal} />
    {:else if requestData.requestType === 'subject'}
        <PopSubjectRequest {requestData} {fileExt} bind:open={showModal} />
    {/if}
{/if}