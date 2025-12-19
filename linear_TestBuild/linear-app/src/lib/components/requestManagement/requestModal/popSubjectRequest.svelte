<script>
    import { Modal, Button, Label, Badge } from "flowbite-svelte";
    import { enhance } from "$app/forms";
    import { BookOpenOutline } from "flowbite-svelte-icons";
    
    let { requestData, fileExt, open = $bindable() } = $props();

    // Derived logic for clean UI
    const statusText = $derived(requestData.Status_ID === 1 ? 'Pending Review' : 
                               requestData.Status_ID === 2 ? 'Approved' : 'Rejected');
</script>

<Modal title="Subject Request Details" bind:open size="xl" autoclose={false}>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="space-y-6">
            <div class="flex items-center gap-4 p-5 bg-purple-50 rounded-lg border border-purple-100">
                <div class="flex-shrink-0 bg-white p-3 rounded-full shadow-sm">
                    <BookOpenOutline class="w-8 h-8 text-purple-600" />
                </div>
                <div class="text-left">
                    <Label class="text-purple-500 text-xs uppercase tracking-wider font-bold">Subject Information</Label>
                    <h3 class="text-xl font-black text-gray-900 leading-tight">
                        {requestData.subCode || 'NO CODE'}
                    </h3>
                    <p class="text-lg text-gray-700 font-medium">{requestData.subName || 'Unnamed Subject'}</p>
                </div>
            </div>

            <div class="text-left space-y-4 px-1">
                <div>
                    <Label class="text-gray-400 text-xs uppercase">Submitted By</Label>
                    <p class="font-semibold text-gray-800">{requestData.Username}</p>
                </div>

                <div>
                    <Label class="text-gray-400 text-xs uppercase">Current Status</Label>
                    <div class="mt-1">
                        <Badge color={requestData.Status_ID === 1 ? 'yellow' : requestData.Status_ID === 2 ? 'green' : 'red'}>
                            {statusText}
                        </Badge>
                    </div>
                </div>

                <div class="pt-6 border-t">
                    <h4 class="font-bold mb-3 text-sm uppercase text-gray-500">Moderator Verdict</h4>
                    <form method="POST" action="?/moderateRequest" use:enhance={() => { open = false; }}>
                        <input type="hidden" name="requestId" value={requestData.Request_ID} />
                        <div class="grid grid-cols-2 gap-4">
                            <Button type="submit" name="action" value="approve" color="green" disabled={requestData.Status_ID === 2}>
                                {requestData.Status_ID === 2 ? 'Approved' : 'Approve'}
                            </Button>
                            <Button type="submit" name="action" value="reject" color="red" disabled={requestData.Status_ID === 3}>
                                {requestData.Status_ID === 3 ? 'Rejected' : 'Reject'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="bg-gray-100 rounded-xl p-2 flex flex-col h-[500px]">
            <h4 class="text-xs font-bold uppercase text-gray-500 mb-2 px-2 text-left">Verification Document</h4>
            <div class="flex-grow bg-white rounded-lg border overflow-hidden flex items-center justify-center">
                {#if requestData.Study_Load}
                    {#if fileExt === 'pdf'}
                        <iframe src={requestData.Study_Load} class="w-full h-full" title="Subject Proof PDF"></iframe>
                    {:else if ['jpg', 'jpeg', 'png'].includes(fileExt)}
                        <img src={requestData.Study_Load} alt="Subject Proof" class="max-w-full max-h-full object-contain" />
                    {:else}
                        <div class="text-center p-4">
                            <p class="text-sm text-gray-600 mb-2">File type .{fileExt} cannot be previewed.</p>
                            <Button href={requestData.Study_Load} download size="xs" color="alternative">Download to View</Button>
                        </div>
                    {/if}
                {:else}
                    <div class="text-center p-10">
                        <p class="text-gray-400 italic">No study load document provided for this subject request.</p>
                    </div>
                {/if}
            </div>
        </div>

    </div>
</Modal>